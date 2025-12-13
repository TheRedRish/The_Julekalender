import {
    createLobby,
    getLobby,
    getAllLobbies,
    joinLobby,
    leaveLobby
} from "../services/lobbyService.js";

export function registerLobbySocket(io, socket) {

    (async () => {
        const lobbies = await getAllLobbies();
        socket.emit("lobby:list", lobbies);
    })();

    socket.on("lobby:create", async (data) => {
        const { name, minPlayers, maxPlayers, password } = data;

        const lobby = await createLobby(
            socket.user,
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
        const lobby = await joinLobby(lobbyId, socket.user);
        if (!lobby) return;

        socket.join(lobbyId);

        io.to(lobbyId).emit("lobby:update", lobby);

        const lobbies = await getAllLobbies();
        io.emit("lobby:list", lobbies);
    });

    socket.on("lobby:leave", async (lobbyId) => {
        await leaveLobby(lobbyId, socket.user.id);

        socket.leave(lobbyId);

        const lobby = await getLobby(lobbyId);
        io.to(lobbyId).emit("lobby:update", lobby);

        const lobbies = await getAllLobbies();
        io.emit("lobby:list", lobbies);
    });

    socket.on("disconnect", async () => {
        const lobbies = await getAllLobbies();

        for (const lobby of lobbies) {
            await leaveLobby(lobby.id, socket.user.id);

            const updatedLobby = await getLobby(lobby.id);
            io.to(lobby.id).emit("lobby:update", updatedLobby);
        }

        const updatedLobbies = await getAllLobbies();
        io.emit("lobby:list", updatedLobbies);
    });
}
