export const lobbyQueries = {
    insertLobby: `
    INSERT INTO lobbies (
      id, owner_id, name, status,
      min_players, max_players, password
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
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
    SET name = ?, min_players = ?, max_players = ?, password = ?
    WHERE id = ? AND owner_id = ?
  `,

    updateLobbyOwner: `
    UPDATE lobbies
    SET owner_id = ?
    WHERE id = ?
  `
};
