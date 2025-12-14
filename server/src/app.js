import dotenv from "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import authRouter from "./routers/authRouter.js";

const app = express();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true
}));

app.use(express.json());

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "default-secret",
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);

app.use(authRouter);

import http from "http";
import { Server } from "socket.io";
import { registerLobbySocket } from "./sockets/lobbysocket.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_ORIGIN,
    credentials: true,
  }
});

io.engine.use(sessionMiddleware);

io.use((socket, next) => {
  try {
    const user = socket.request.session?.user;

    if (!user) return next(new Error("Unauthorized"));

    next();
  } catch (err) {
    next(err);
  }
});

io.on("connection", (socket) => {
  registerLobbySocket(io, socket);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server running on port ", PORT));
