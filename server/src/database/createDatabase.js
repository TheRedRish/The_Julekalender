import db from "./connection.js";
import { gameQueries } from "./queries/gameQueries.js";
import { lobbyQueries } from "./queries/lobbyQueries.js";
import { seedDefaultGames, getDefaultGameId } from "./seedGames.js";
import { seedDefaultUsers } from "./seedUsers.js";

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

await db.exec(` 
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

    ${lobbyQueries.createSchema(defaultGameId)}
`);

if (deleteMode) {
    await seedDefaultGames();
    await seedDefaultUsers();
}