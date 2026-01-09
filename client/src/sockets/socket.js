import { io } from "socket.io-client";

let socketInstance = null;

export function connectSocket() {
    if (!socketInstance) {
        socketInstance = io("http://localhost:8080", {
            withCredentials: true,
        });
    } else if (!socketInstance.connected && !socketInstance.connecting) {
        socketInstance.connect();
    }
    return socketInstance;
}

export function disconnectSocket() {
    if (!socketInstance) return;
    socketInstance.off();
    socketInstance.disconnect();
    socketInstance = null;
}

export function getSocket() {
    return socketInstance;
}
