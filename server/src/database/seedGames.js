import db from "../database/connection.js";
import { gameQueries } from "./queries/gameQueries.js";

export const defaultGames = [
    {
        id: "the-julekalende",
        name: "The Julekalender",
        description: "Play as Fritz, Hansi, and Gynther and save Gammel Nok just in time. It’s hard to be a nisseman – especially when everything has to be done by the book.",
        min_players: 1,
        max_players: 3,
        display_order: 1
    },
    {
        id: "snowball-showdown",
        name: "Snowball Showdown",
        description: "Fast-paced snowball fights with short rounds and quick rematches.",
        min_players: 2,
        max_players: 6,
        display_order: 2
    }
];

export function getDefaultGameId() {
    return defaultGames[0].id;
}

export async function seedDefaultGames() {
    for (const game of defaultGames) {
        await db.run(
            gameQueries.insertOrIgnore,
            [game.id, game.name, game.description, game.min_players, game.max_players, game.display_order ?? 0]
        );
    }
}
