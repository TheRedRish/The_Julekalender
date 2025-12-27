import {
    createLobby,
    getLobby,
    getAllLobbies,
    joinLobby,
    leaveLobby,
    updateLobbySettings,
    kickPlayer
} from "../services/lobbyService.js";

// Track pending disconnect cleanups per user so we can tell a quick reload
// from actually leaving the site. A short grace period prevents accidental
// lobby cleanup when the user refreshes.
const disconnectTimers = new Map();
const DISCONNECT_GRACE_MS = 5000;

function joinErrorMessage(code) {
    switch (code) {
        case "unauthorized":
            return "You must be logged in to join this lobby.";
        case "not_found":
            return "Lobby not found.";
        case "full":
            return "This lobby is full.";
        case "password_required":
            return "This lobby is locked. Enter the password to join.";
        case "password_invalid":
            return "Incorrect password for this lobby.";
        default:
            return "Could not join the lobby.";
    }
}

export function registerLobbySocket(io, socket) {
    const userId = socket.request.session.user.id;

    const pendingDisconnect = disconnectTimers.get(userId);
    if (pendingDisconnect) {
        clearTimeout(pendingDisconnect);
        disconnectTimers.delete(userId);
    }

    (async () => {
        const lobbies = await getAllLobbies();
        socket.emit("lobby:list", lobbies);
    })();

    socket.on("lobby:create", async (data) => {
        const { name, minPlayers, maxPlayers, password, gameId } = data;

        const lobby = await createLobby(
            socket.request.session.user,
            name,
            minPlayers,
            maxPlayers,
            password,
            gameId
        );

        socket.join(lobby.id);

        socket.emit("lobby:created", lobby);

        const lobbies = await getAllLobbies();
        io.emit("lobby:list", lobbies);
    });

    socket.on("lobby:join", async (data, callback) => {
        const lobbyId = typeof data === "string" ? data : data.lobbyId;
        const password = typeof data === "string" ? null : data.password ?? null;
        const user = socket.request.session.user;

        if (!lobbyId) {
            callback?.({ ok: false, message: "Lobby ID is required." });
            return;
        }

        const { lobby, error } = await joinLobby(lobbyId, user, password);
        if (!lobby) {
            callback?.({ ok: false, message: joinErrorMessage(error) });
            return;
        }

        socket.join(lobbyId);

        io.to(lobbyId).emit("lobby:update", lobby);

        const lobbies = await getAllLobbies();
        io.emit("lobby:list", lobbies);

        callback?.({ ok: true, lobby });
    });

    socket.on("lobby:leave", async (lobbyId) => {
        const lobby = await leaveLobby(lobbyId, socket.request.session.user.id);

        socket.leave(lobbyId);

        io.to(lobbyId).emit("lobby:update", lobby);

        const lobbies = await getAllLobbies();
        io.emit("lobby:list", lobbies);
    });

    socket.on("lobby:update-settings", async ({ lobbyId, name, minPlayers, maxPlayers, password, gameId }) => {
        const lobby = await updateLobbySettings(
            lobbyId,
            socket.request.session.user.id,
            { name, minPlayers, maxPlayers, password, gameId }
        );

        if (!lobby) return;

        io.to(lobbyId).emit("lobby:update", lobby);

        const lobbies = await getAllLobbies();
        io.emit("lobby:list", lobbies);
    });

    socket.on("lobby:kick", async ({ lobbyId, playerId }) => {
        const lobby = await kickPlayer(
            lobbyId,
            socket.request.session.user.id,
            playerId
        );

        if (!lobby) return;

        const lobbies = await getAllLobbies();
        io.to(lobbyId).emit("lobby:update", lobby);
        io.emit("lobby:list", lobbies);
    });

    socket.on("disconnect", async () => {
        const timer = setTimeout(async () => {
            disconnectTimers.delete(userId);

            // If any socket for this user is still connected, skip cleanup.
            const hasActiveSocket = Array.from(io.sockets.sockets.values())
                .some((s) => s.user.id === userId);
            if (hasActiveSocket) {
                return;
            }
            const lobbies = await getAllLobbies();

            for (const lobby of lobbies) {
                const updatedLobby = await leaveLobby(lobby.id, userId);
                io.to(lobby.id).emit("lobby:update", updatedLobby);
            }

            const updatedLobbies = await getAllLobbies();
            io.emit("lobby:list", updatedLobbies);
        }, DISCONNECT_GRACE_MS);

        disconnectTimers.set(userId, timer);
    });
}
