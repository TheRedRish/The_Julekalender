import db from "../database/connection.js";
import { lobbyQueries } from "../database/queries/lobbyQueries.js";
import { randomString, randomThreeWordName } from "../util/stringUtil.js";
import { getGameById } from "./gameService.js";

function computeLobbyStatus(lobby) {
    if (lobby.status === "In Game") {
        return "In Game";
    }

    const playerCount = lobby.players.length;
    const maxPlayers = lobby.game?.max_players ?? lobby.max_players;
    if (maxPlayers && playerCount >= maxPlayers) {
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

    const withGame = await attachGameMetadata({ ...lobby, players });
    return ensureLobbyStatus(withGame);
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

        const withGame = await attachGameMetadata({ ...lobby, players });
        const lobbyWithStatus = await ensureLobbyStatus(withGame);
        result.push(lobbyWithStatus);
    }

    return result;
}

export async function joinLobby(id, user, password = null) {
    if (!user.id) {
        return { lobby: null, error: "unauthorized" };
    }

    const lobby = await getLobby(id);
    if (!lobby) return { lobby: null, error: "not_found" };

    if (lobby.status === "In Game") {
        return { lobby: null, error: "in_game" };
    }

    const isAlreadyMember = lobby.players.some((player) => player.id === user.id);
    if (isAlreadyMember) {
        return { lobby, error: null };
    }

    const maxPlayers = lobby.game?.max_players ?? lobby.max_players;
    if (maxPlayers && lobby.players.length >= maxPlayers) {
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
    { name, password, gameId }
) {
    const lobby = await getLobby(lobbyId);
    if (!lobby || lobby.owner_id !== ownerId) return null;

    const game = await getGameById(gameId);
    if (!game) return null;

    await db.run(
        lobbyQueries.updateLobbyByOwner,
        [name, gameId, password, lobbyId, ownerId]
    );

    return getLobby(lobbyId);
}

export async function kickPlayer(lobbyId, ownerId, targetUserId) {
    const lobby = await getLobby(lobbyId);
    if (!lobby || lobby.owner_id !== ownerId) return null;
    if (targetUserId === ownerId) return lobby;

    return leaveLobby(lobbyId, targetUserId);
}

export async function startLobby(lobbyId, ownerId) {
    const lobby = await getLobby(lobbyId);
    if (!lobby || lobby.owner_id !== ownerId) return null;

    await db.run(lobbyQueries.updateLobbyStatus, ["In Game", lobbyId]);

    return getLobby(lobbyId);
}
