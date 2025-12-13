import db from './connection.js';

const deleteMode = process.argv.includes('--delete');

if (deleteMode) {
    db.exec(`DROP TABLE IF EXISTS exercises;`);
    db.exec(`DROP TABLE IF EXISTS users;`);
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

    CREATE TABLE lobbies (
        id TEXT PRIMARY KEY,
        owner_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        min_players INTEGER NOT NULL,
        max_players INTEGER,
        password TEXT,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users(id)
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
