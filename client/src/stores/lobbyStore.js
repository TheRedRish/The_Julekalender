import { writable } from "svelte/store";
import { navigate } from "svelte-routing";
import { userStore } from "./userStore.js";
import { getSocket } from "../sockets/socket.js";

export const lobbyStore = writable([]);
export const currentLobby = writable(null);

let unsubscribeSocketHandlers = null;

function attachHandlers(socket) {
    const onList = (lobbies) => lobbyStore.set(lobbies);
    const onUpdate = (lobby) => currentLobby.set(lobby);
    const onJoined = (lobby) => navigate(`/lobby/${lobby.id}`);

    socket.on("lobby:list", onList);
    socket.on("lobby:update", onUpdate);
    socket.on("lobby:joined", onJoined);

    return () => {
        socket.off("lobby:list", onList);
        socket.off("lobby:update", onUpdate);
        socket.off("lobby:joined", onJoined);
    };
}

userStore.subscribe((user) => {
    // cleanup previous socket/listeners
    if (unsubscribeSocketHandlers) {
        unsubscribeSocketHandlers();
        unsubscribeSocketHandlers = null;
    }
    lobbyStore.set([]);
    currentLobby.set(null);

    if (!user) return;

    // create fresh socket for logged-in user
    const socket = getSocket();
    if (!socket) return;
    unsubscribeSocketHandlers = attachHandlers(socket);
});
