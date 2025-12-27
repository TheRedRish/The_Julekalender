import { getSocket } from "./socket.js";

export function emit(event, payload) {
    const socket = getSocket();
    if (!socket) {
        throw new Error("Socket not connected.");
    }
    socket.emit(event, payload);
}

export function emitWithAck(event, payload) {
    const socket = getSocket();
    if (!socket) {
        return Promise.reject(new Error("Socket not connected."));
    }

    return socket.emitWithAck(event, payload).then((response) => {
        if (response && response.ok === false) {
            throw new Error(response.message || "Request failed.");
        }
        return response;
    });
}
