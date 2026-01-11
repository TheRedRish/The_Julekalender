import dotenv from "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routers/authRouter.js";
import gameRouter from "./routers/gameRouter.js";
import http from "http";
import { registerGameRouters } from "./games/index.js";
import { Server } from "socket.io";
import { registerLobbySocket } from "./sockets/lobbysocket.js";
import { authGuardSocket } from "./util/authGuard.js";
import { rateLimit } from "express-rate-limit";

const app = express();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "default-secret",
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);

app.use(helmet());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 60, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});

const generalLimiterExemptPaths = new Set(["/api/auth/session"]);
app.use((req, res, next) => {
  if (generalLimiterExemptPaths.has(req.path)) {
    return next();
  }
  return generalLimiter(req, res, next);
});

app.use(authRouter);
app.use(gameRouter);
registerGameRouters(app);

app.all("/{*splat}", (req, res) => {
  res.status(404).json({
    error: "Not found",
    method: req.method,
    path: req.originalUrl,
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FRONTEND_ORIGIN,
    credentials: true,
  },
});

io.engine.use(sessionMiddleware);

io.use(authGuardSocket);

io.on("connection", (socket) => {
  registerLobbySocket(io, socket);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server running on port ", PORT));
