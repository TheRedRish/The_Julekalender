import db from "../database/connection.js";
import { gameModules } from "../games/index.js";
import { gameQueries } from "./queries/gameQueries.js";

export function getDefaultGameId() {
    return gameModules[0].id;
}

export async function seedDefaultGames() {
    for (const game of gameModules) {
        await db.run(
            gameQueries.insertOrIgnore,
            [game.id, game.name, game.description, game.min_players, game.max_players, game.display_order]
        );
    }
}
