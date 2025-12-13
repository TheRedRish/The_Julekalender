import { io } from "socket.io-client";

let socketInstance;
export const getSocket = () => {
    if (!socketInstance) {
        socketInstance = io("http://localhost:8080", {
            withCredentials: true
        });
    }

    return socketInstance;
};