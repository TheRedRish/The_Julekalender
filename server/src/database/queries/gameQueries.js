export const gameQueries = {
    createTable: `
        CREATE TABLE IF NOT EXISTS games (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            min_players INTEGER NOT NULL,
            max_players INTEGER,
            display_order INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `,
    insertOrIgnore: `
        INSERT OR IGNORE INTO games (id, name, description, min_players, max_players, display_order)
        VALUES (?, ?, ?, ?, ?, ?);
    `,
    getAllGames: `
        SELECT id, name, description, min_players, max_players, display_order
        FROM games
        ORDER BY display_order ASC, name ASC;
    `,
    getGameById: `
        SELECT id, name, description, min_players, max_players, display_order
        FROM games
        WHERE id = ?;
    `
};
