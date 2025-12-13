import { getSocket } from "./socket.js";

const socket = getSocket();

export function createLobby() {
    socket.emit("lobby:create");
}

export function joinLobby(lobbyId) {
    socket.emit("lobby:join", lobbyId);
}

export function leaveLobby(lobbyId) {
    socket.emit("lobby:leave", lobbyId);
}
