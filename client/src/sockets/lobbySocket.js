import { emit, emitWithAck } from "./socketUtil.js";

export function createLobby(data) {
    emit("lobby:create", data);
}

export function joinLobby(lobbyId, password = null) {
    return emitWithAck("lobby:join", { lobbyId, password }).then((res) => res.lobby);
}

export function leaveLobby(lobbyId) {
    emit("lobby:leave", lobbyId);
}

export function updateLobbySettings(lobbyId, settings) {
    emit("lobby:update-settings", { lobbyId, ...settings });
}

export function kickPlayer(lobbyId, playerId) {
    emit("lobby:kick", { lobbyId, playerId });
}
