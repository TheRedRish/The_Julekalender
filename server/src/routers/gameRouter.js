import { Router } from "express";
import { getAllGames } from "../services/gameService.js";

const router = Router();

router.get("/api/games", async (_req, res) => {
    try {
        const games = await getAllGames();
        res.send(games);
    } catch (error) {
        console.error("Failed to fetch games", error);
        res.status(500).send({ error: "Failed to fetch games" });
    }
});

export default router;
