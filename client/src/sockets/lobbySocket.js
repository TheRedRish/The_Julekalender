import { getSocket } from "./socket.js";

export function createLobby(data) {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("lobby:create", data);
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

export function updateLobbySettings(lobbyId, settings) {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("lobby:update-settings", { lobbyId, ...settings });
}

export function kickPlayer(lobbyId, playerId) {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("lobby:kick", { lobbyId, playerId });
}
