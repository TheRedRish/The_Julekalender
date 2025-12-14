import { getSocket } from "./socket.js";

export function createLobby() {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("lobby:create");
}

export function joinLobby(lobbyId) {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("lobby:join", lobbyId);
}

export function leaveLobby(lobbyId) {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("lobby:leave", lobbyId);
}
