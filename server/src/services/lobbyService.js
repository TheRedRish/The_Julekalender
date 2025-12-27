import db from "../database/connection.js";
import { lobbyQueries } from "../database/queries/lobbyQueries.js";
import { randomString, randomThreeWordName } from "../util/stringUtil.js";
import { getGameById } from "./gameService.js";

function computeLobbyStatus(lobby) {
    const playerCount = lobby.players.length;
    if (lobby.max_players && playerCount >= lobby.max_players) {
        return "Full";
    }

    return "Waiting";
}

async function ensureLobbyStatus(lobby) {
    if (!lobby) return null;

    const nextStatus = computeLobbyStatus(lobby);
    if (lobby.status === nextStatus) {
        return lobby;
    }

    await db.run(lobbyQueries.updateLobbyStatus, [nextStatus, lobby.id]);
    return { ...lobby, status: nextStatus };
}

async function attachGameMetadata(lobby) {
    if (!lobby) return null;
    const game = await getGameById(lobby.game_id);
    return { ...lobby, game };
}

export async function createLobby(
    owner,
    name,
    minPlayers = 1,
    maxPlayers = null,
    password = null,
    gameId = null
) {
    const id = randomString(6);
    const lobbyName = name || randomThreeWordName();

    await db.run(
        lobbyQueries.insertLobby,
        [
            id,
            owner.id,
            lobbyName,
            gameId,
            "Waiting",
            minPlayers,
            maxPlayers,
            password
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

    const lobbyWithStatus = await ensureLobbyStatus({ ...lobby, players });
    return attachGameMetadata(lobbyWithStatus);
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

        const lobbyWithStatus = await ensureLobbyStatus({ ...lobby, players });
        const withGame = await attachGameMetadata(lobbyWithStatus);
        result.push(withGame);
    }

    return result;
}

export async function joinLobby(id, user, password = null) {
    if (!user.id) {
        return { lobby: null, error: "unauthorized" };
    }

    const lobby = await getLobby(id);
    if (!lobby) return { lobby: null, error: "not_found" };

    const isAlreadyMember = lobby.players.some((player) => player.id === user.id);
    if (isAlreadyMember) {
        return { lobby, error: null };
    }

    if (
        lobby.max_players &&
        lobby.players.length >= lobby.max_players
    ) {
        return { lobby: null, error: "full" };
    }

    if (lobby.password && lobby.owner_id !== user.id) {
        if (!password) {
            return { lobby: null, error: "password_required" };
        }
        if (password !== lobby.password) {
            return { lobby: null, error: "password_invalid" };
        }
    }

    await db.run(
        lobbyQueries.insertLobbyPlayer,
        [id, user.id]
    );

    const updatedLobby = await getLobby(id);
    return { lobby: updatedLobby, error: null };
}

export async function leaveLobby(id, userId) {
    const lobby = await getLobby(id);
    const ownerIsLeaving = lobby.owner_id === userId;

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

        return null;
    }

    let updatedLobby = await getLobby(id);

    if (ownerIsLeaving && updatedLobby) {
        const nextOwnerId = updatedLobby.players[0].id;
        if (nextOwnerId) {
            await db.run(
                lobbyQueries.updateLobbyOwner,
                [nextOwnerId, id]
            );
            updatedLobby = await getLobby(id);
        }
    }

    return updatedLobby;
}

export async function updateLobbySettings(
    lobbyId,
    ownerId,
    { name, minPlayers, maxPlayers, password, gameId }
) {
    const lobby = await getLobby(lobbyId);
    if (!lobby || lobby.owner_id !== ownerId) return null;

    await db.run(
        lobbyQueries.updateLobbyByOwner,
        [name, gameId, minPlayers, maxPlayers, password, lobbyId, ownerId]
    );

    return getLobby(lobbyId);
}

export async function kickPlayer(lobbyId, ownerId, targetUserId) {
    const lobby = await getLobby(lobbyId);
    if (!lobby || lobby.owner_id !== ownerId) return null;
    if (targetUserId === ownerId) return lobby;

    return leaveLobby(lobbyId, targetUserId);
}
