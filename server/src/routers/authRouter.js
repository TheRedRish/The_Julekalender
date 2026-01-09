import { Router } from "express";
import { authGuardRouter } from "../util/authGuard.js";
import { getUserById } from "../database/queries/user.js";
import { loginUser, registerUser, resetPassword } from "../services/authService.js";

const router = Router();

router.post("/api/auth/register", async (req, res) => {
    try {
        const user = await registerUser(req.body);
        req.session.user = user;
        res.status(201).send(user);
    } catch (err) {
        res.status(err.status || 500).send({ error: err.message });
    }
});

router.post("/api/auth/login", async (req, res) => {
    try {
        const user = await loginUser(req.body);
        req.session.user = user;
        res.send(user);
    } catch (err) {
        res.status(err.status || 500).send({ error: err.message });
    }
});

router.post("/api/auth/forgot", async (req, res) => {
    try {
        const result = await resetPassword(req.body);
        res.send(result);
    } catch (err) {
        res.status(err.status || 500).send({ error: err.message });
    }
});

router.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
        res.send({ message: "Logout successful" });
    });
});

router.get("/api/auth/session", authGuardRouter, async (req, res) => {
    //TODO Do you still need this?
    try {
        const user = await getUserById(req.session.user.id);
        res.send({ user });
    } catch (error) {
        console.error("Fetching user failed", error);
        res.status(500).send({ error: "Failed to fetch user" });
    }
});

export default router;
