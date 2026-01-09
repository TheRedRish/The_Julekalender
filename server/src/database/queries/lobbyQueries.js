export const lobbyQueries = {
    createSchema: (defaultGameId) => `
    CREATE TABLE lobbies (
      id TEXT PRIMARY KEY,
      owner_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      game_id TEXT NOT NULL DEFAULT '${defaultGameId}',
      status TEXT NOT NULL,
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

    CREATE INDEX idx_lobby_players_lobby
      ON lobby_players (lobby_id);

    CREATE INDEX idx_lobby_players_user
      ON lobby_players (user_id);
  `,

    insertLobby: `
    INSERT INTO lobbies (
      id, owner_id, name, game_id, status,
      password
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `,

    insertLobbyPlayer: `
    INSERT OR IGNORE INTO lobby_players (lobby_id, user_id)
    VALUES (?, ?)
  `,

    getLobbyById: `
    SELECT *
    FROM lobbies
    WHERE id = ?
  `,

    getLobbyPlayers: `
    SELECT u.id, u.username
    FROM lobby_players lp
    JOIN users u ON u.id = lp.user_id
    WHERE lp.lobby_id = ?
    ORDER BY u.id ASC
  `,

    getAllLobbies: `
    SELECT *
    FROM lobbies
    ORDER BY created_at DESC
  `,

    deleteLobbyPlayer: `
    DELETE FROM lobby_players
    WHERE lobby_id = ? AND user_id = ?
  `,

    countLobbyPlayers: `
    SELECT COUNT(*) AS count
    FROM lobby_players
    WHERE lobby_id = ?
  `,

    deleteLobby: `
    DELETE FROM lobbies
    WHERE id = ?
  `,

    updateLobbyStatus: `
    UPDATE lobbies
    SET status = ?
    WHERE id = ?
  `,

    updateLobbyByOwner: `
    UPDATE lobbies
    SET name = ?, game_id = ?, password = ?
    WHERE id = ? AND owner_id = ?
  `,

    updateLobbyOwner: `
    UPDATE lobbies
    SET owner_id = ?
    WHERE id = ?
  `,
};
