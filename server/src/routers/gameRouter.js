import { Router } from "express";
import { getAllGames } from "../services/gameService.js";
import { authGuardRouter } from "../util/authGuard.js";

const router = Router();

router.get("/api/games", authGuardRouter, async (_req, res) => {
    try {
        const games = await getAllGames();
        res.send(games);
    } catch (error) {
        res.status(500).send({ error: "Failed to fetch games" });
    }
});

export default router;
