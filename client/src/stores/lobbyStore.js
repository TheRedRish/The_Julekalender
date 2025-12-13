import { writable } from "svelte/store";
import { navigate } from "svelte-routing";
import { getSocket } from "../sockets/socket.js";

const socket = getSocket();

export const lobbyStore = writable([]);

export const currentLobby = writable(null);

socket.on("lobby:list", (lobbies) => {
    lobbyStore.set(lobbies);
});

socket.on("lobby:update", (lobby) => {
    currentLobby.set(lobby);
});

socket.on("lobby:joined", (lobby) => {
    navigate(`/lobby/${lobby.id}`);
});
