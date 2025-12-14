import {
    createLobby,
    getLobby,
    getAllLobbies,
    joinLobby,
    leaveLobby
} from "../services/lobbyService.js";

// Track pending disconnect cleanups per user so we can tell a quick reload
// from actually leaving the site. A short grace period prevents accidental
// lobby cleanup when the user refreshes.
const disconnectTimers = new Map();
const DISCONNECT_GRACE_MS = 5000;

export function registerLobbySocket(io, socket) {
    const userId = socket.request.session?.user.id;

    console.log("Registering lobby socket for user", userId);
    const pendingDisconnect = disconnectTimers.get(userId);
    if (pendingDisconnect) {
        console.log("Clearing pending disconnect for user", userId);
        clearTimeout(pendingDisconnect);
        disconnectTimers.delete(userId);
    }

    (async () => {
        const lobbies = await getAllLobbies();
        socket.emit("lobby:list", lobbies);
    })();

    socket.on("lobby:create", async (data) => {
        const { name, minPlayers, maxPlayers, password } = data;

        const lobby = await createLobby(
            socket.request.session?.user,
            name,
            minPlayers,
            maxPlayers,
            password
        );

        socket.join(lobby.id);

        socket.emit("lobby:created", lobby);

        const lobbies = await getAllLobbies();
        io.emit("lobby:list", lobbies);
    });

    socket.on("lobby:join", async (lobbyId) => {
        const lobby = await joinLobby(lobbyId, socket.request.session?.user);
        if (!lobby) return;

        socket.join(lobbyId);

        io.to(lobbyId).emit("lobby:update", lobby);

        const lobbies = await getAllLobbies();
        io.emit("lobby:list", lobbies);
    });

    socket.on("lobby:leave", async (lobbyId) => {
        await leaveLobby(lobbyId, socket.request.session?.user.id);

        socket.leave(lobbyId);

        const lobby = await getLobby(lobbyId);
        io.to(lobbyId).emit("lobby:update", lobby);

        const lobbies = await getAllLobbies();
        io.emit("lobby:list", lobbies);
    });

    socket.on("disconnect", async () => {
        const timer = setTimeout(async () => {
            disconnectTimers.delete(userId);

            // If any socket for this user is still connected, skip cleanup.
            const hasActiveSocket = Array.from(io.sockets.sockets.values())
                .some((s) => s.user?.id === userId);
            if (hasActiveSocket) {
                console.log("Skipping disconnect cleanup for user", userId);
                return;
            }
            console.log("Cleaning up lobbies for user", userId);
            const lobbies = await getAllLobbies();

            for (const lobby of lobbies) {
                await leaveLobby(lobby.id, userId);

                const updatedLobby = await getLobby(lobby.id);
                io.to(lobby.id).emit("lobby:update", updatedLobby);
            }

            const updatedLobbies = await getAllLobbies();
            io.emit("lobby:list", updatedLobbies);
        }, DISCONNECT_GRACE_MS);

        disconnectTimers.set(userId, timer);
    });
}
