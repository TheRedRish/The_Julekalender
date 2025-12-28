import { Router } from "express";
import { getGameStatus } from "./service.js";

const router = Router();

router.get("/", async (_req, res) => {
  const status = await getGameStatus();
  res.send(status);
});

export default router;
