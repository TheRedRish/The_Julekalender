import db from "../database/connection.js";
import { gameQueries } from "../database/queries/gameQueries.js";

export async function getAllGames() {
    return db.all(gameQueries.getAllGames);
}

export async function getGameById(gameId) {
    if (!gameId) return null;
    return db.get(gameQueries.getGameById, [gameId]);
}

export async function getDefaultGame() {
    const games = await getAllGames();
    return games[0];
}
