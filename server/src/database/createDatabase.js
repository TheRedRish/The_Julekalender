import db from "./connection.js";
import { gameQueries } from "./queries/gameQueries.js";
import { seedDefaultGames, getDefaultGameId } from "./seedGames.js";

const deleteMode = process.argv.includes("--delete");
const defaultGameId = getDefaultGameId();

if (deleteMode) {
    await db.exec(`DROP TABLE IF EXISTS exercises;`);
    await db.exec(`DROP TABLE IF EXISTS users;`);
    await db.exec(`DROP TABLE IF EXISTS login_events;`);
    await db.exec(`DROP TABLE IF EXISTS lobbies;`);
    await db.exec(`DROP TABLE IF EXISTS lobby_players;`);
    await db.exec(`DROP TABLE IF EXISTS games;`);
}

db.exec(` 
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS login_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );

    ${gameQueries.createTable}

    CREATE TABLE IF NOT EXISTS lobbies (
        id TEXT PRIMARY KEY,
        owner_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        game_id TEXT NOT NULL DEFAULT '${defaultGameId}',
        status TEXT NOT NULL,
        min_players INTEGER NOT NULL,
        max_players INTEGER,
        password TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users(id),
        FOREIGN KEY (game_id) REFERENCES games(id)
    );

    CREATE TABLE lobby_players (
        lobby_id TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        PRIMARY KEY (lobby_id, user_id),
        FOREIGN KEY (lobby_id) REFERENCES lobbies(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_lobby_players_lobby
        ON lobby_players (lobby_id);

    CREATE INDEX IF NOT EXISTS idx_lobby_players_user
        ON lobby_players (user_id);
`);

if (deleteMode) {
    await seedDefaultGames();
}