import { io } from "socket.io-client";

const SOCKET_BASE = import.meta.env.VITE_SOCKET_BASE || "http://localhost:8080";

let socketInstance = null;

export function connectSocket() {
  if (!socketInstance) {
    socketInstance = io(SOCKET_BASE, {
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
