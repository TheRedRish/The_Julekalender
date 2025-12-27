<script>
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { getSocket } from "../../../sockets/socket.js";
  import { createLobby } from "../../../sockets/lobbySocket.js";
  import { gamesStore, loadGames } from "../../../stores/gameStore.js";

  let lobbyName = $state("");
  let selectedGameId = $state("");
  let minPlayers = $state("");
  let maxPlayers = $state("");
  let password = $state("");

  const socket = getSocket();
  const games = $derived($gamesStore);
  const selectedGame = $derived(
    games.find((game) => game.id === selectedGameId)
  );

  onMount(async () => {
    const loadedGames = await loadGames();
    if (!selectedGameId && loadedGames.length > 0) {
      const first = loadedGames[0];
      selectedGameId = first.id;
      minPlayers = first.min_players;
      maxPlayers = first.max_players;
    }
  });

  function submitCreateLobby() {
    createLobby({
      name: lobbyName || null,
      minPlayers: Number(minPlayers),
      maxPlayers: Number(maxPlayers),
      password: password || null,
      gameId: selectedGameId,
    });
  }

  socket.once("lobby:created", (lobby) => {
    navigate(`/lobby/${lobby.id}`);
  });
</script>

<div class="create-lobby">
  <h2 class="create-lobby__title">Create a Lobby</h2>

  <p class="create-lobby__subtitle">
    Give your lobby a festive name and start inviting friends!
  </p>

  <div class="create-lobby__field">
    <label class="create-lobby__label" for="create-lobby-game">Game</label>
    <select
      class="create-lobby__input"
      id="create-lobby-game"
      bind:value={selectedGameId}
    >
      {#each games as game}
        <option value={game.id}>{game.name}</option>
      {/each}
    </select>
    {#if selectedGame}
      <div class="create-lobby__game-meta">
        <p class="create-lobby__game-name">{selectedGame.name}</p>
        <p class="create-lobby__game-description">
          {selectedGame.description}
        </p>
        <p class="create-lobby__game-hint">
          Suggested players: {selectedGame.min_players}
          {#if selectedGame.max_players}
            - {selectedGame.max_players}
          {:else}
            - No max
          {/if}
        </p>
      </div>
    {/if}
  </div>

  <div class="create-lobby__field">
    <label class="create-lobby__label" for="create-lobby-name">Lobby Name</label>
    <input
      class="create-lobby__input"
      type="text"
      id="create-lobby-name"
      placeholder="Enter a festive name..."
      bind:value={lobbyName}
    />
    <small class="create-lobby__hint">Leave empty for a random name</small>
  </div>

  <div class="create-lobby__field">
    <label class="create-lobby__label" for="create-lobby-min">Minimum Players</label>
    <input
      class="create-lobby__input"
      type="number"
      min="1"
      id="create-lobby-min"
      bind:value={minPlayers}
    />
  </div>

  <div class="create-lobby__field">
    <label class="create-lobby__label" for="create-lobby-max">Maximum Players</label>
    <input
      class="create-lobby__input"
      type="number"
      min="1"
      placeholder="No limit"
      id="create-lobby-max"
      bind:value={maxPlayers}
    />
  </div>

  <div class="create-lobby__field">
    <label class="create-lobby__label" for="create-lobby-password">Password (optional)</label>
    <input
      class="create-lobby__input"
      type="password"
      placeholder="Leave empty for public lobby"
      id="create-lobby-password"
      bind:value={password}
    />
  </div>

  <button class="create-lobby__submit" onclick={submitCreateLobby}>
    Create Lobby
  </button>
</div>

<style>
  @import "./createLobbyCard.css";
</style>
