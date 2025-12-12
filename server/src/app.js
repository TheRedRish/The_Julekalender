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

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(authRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running on port ", PORT));
