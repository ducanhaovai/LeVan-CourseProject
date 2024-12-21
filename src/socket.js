import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3001";
export const socket = io(SOCKET_URL);

socket.on("connect", () => {
  console.log("Connected to socket server:", socket.id);
});
