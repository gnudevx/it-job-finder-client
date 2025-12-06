// src/services/socket.js
import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_API_BASE_URL, {
    transports: ["websocket"],
});

// Khi kết nối
socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
});
