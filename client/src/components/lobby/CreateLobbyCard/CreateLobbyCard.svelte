<script>
  import { navigate } from "svelte-routing";
  import { onDestroy, onMount } from "svelte";
  import { getSocket } from "../../../sockets/socket.js";
  import { createLobby } from "../../../sockets/lobbySocket.js";
  import { gamesStore, loadGames } from "../../../stores/gameStore.js";

  let lobbyName = $state("");
  let selectedGameId = $state("");
  let password = $state("");

  const socket = getSocket();
  const games = $derived($gamesStore);
  const selectedGame = $derived(games.find((game) => game.id === selectedGameId));

  onMount(async () => {
    if (games.length === 0){
      await loadGames();
    }
    if (!selectedGameId && $gamesStore.length > 0) {
      const first = $gamesStore[0];
      selectedGameId = first.id;
    }
  });

  function submitCreateLobby() {
    createLobby({
      name: lobbyName || null,
      password: password || null,
      gameId: selectedGameId,
    });
  }

  socket?.once("lobby:created", (lobby) => {
    navigate(`/lobby/${lobby.id}`);
  });

  onDestroy(() => {
    socket?.off("lobby:created");
  })
</script>

<div class="create-lobby">
  <h2 class="create-lobby__title">Create a Lobby</h2>

  <p class="create-lobby__subtitle">Give your lobby a festive name and start inviting friends!</p>

  <div class="create-lobby__field">
    <label class="create-lobby__label" for="create-lobby-game">Game</label>
    <select class="create-lobby__input" id="create-lobby-game" bind:value={selectedGameId}>
      {#each games as game (game.id)}
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
    <label class="create-lobby__label" for="create-lobby-password">Password (optional)</label>
    <input
      class="create-lobby__input"
      type="password"
      placeholder="Leave empty for public lobby"
      id="create-lobby-password"
      bind:value={password}
    />
  </div>

  <button class="create-lobby__submit" onclick={submitCreateLobby}> Create Lobby </button>
</div>

<style>
  @import "./createLobbyCard.css";
</style>
