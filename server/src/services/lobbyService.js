import db from "../database/connection.js";
import { lobbyQueries } from "../database/queries/lobbyQueries.js";
import { randomString, randomThreeWordName } from "../util/stringUtil.js";

export async function createLobby(
    owner,
    name,
    minPlayers = 1,
    maxPlayers = null,
    password = null
) {
    const id = randomString(6);
    const lobbyName = name || randomThreeWordName();
    const createdAt = Date.now();

    await db.run(
        lobbyQueries.insertLobby,
        [
            id,
            owner.id,
            lobbyName,
            "waiting",
            minPlayers,
            maxPlayers,
            password,
            createdAt
        ]
    );

    await db.run(
        lobbyQueries.insertLobbyPlayer,
        [id, owner.id]
    );

    return getLobby(id);
}

export async function getLobby(id) {
    const lobby = await db.get(
        lobbyQueries.getLobbyById,
        [id]
    );

    if (!lobby) return null;

    const players = await db.all(
        lobbyQueries.getLobbyPlayers,
        [id]
    );

    return { ...lobby, players };
}

export async function getAllLobbies() {
    const lobbies = await db.all(
        lobbyQueries.getAllLobbies
    );

    const result = [];

    for (const lobby of lobbies) {
        const players = await db.all(
            lobbyQueries.getLobbyPlayers,
            [lobby.id]
        );

        result.push({ ...lobby, players });
    }

    return result;
}

export async function joinLobby(id, user) {
    const lobby = await getLobby(id);
    if (!lobby) return null;

    if (
        lobby.max_players &&
        lobby.players.length >= lobby.max_players
    ) {
        return null;
    }

    await db.run(
        lobbyQueries.insertLobbyPlayer,
        [id, user.id]
    );

    return getLobby(id);
}

export async function leaveLobby(id, userId) {
    await db.run(
        lobbyQueries.deleteLobbyPlayer,
        [id, userId]
    );

    const { count } = await db.get(
        lobbyQueries.countLobbyPlayers,
        [id]
    );

    if (count === 0) {
        await db.run(
            lobbyQueries.deleteLobby,
            [id]
        );
    }
}
