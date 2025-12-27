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

    return new Promise((resolve, reject) => {
        socket.emit(event, payload, (response) => {
            if (!response.ok) {
                reject(new Error(response.message || "Request failed."));
                return;
            }
            resolve(response);
        });
    });
}
