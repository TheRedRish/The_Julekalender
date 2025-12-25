<script>
  import { navigate } from "svelte-routing";
  import { getSocket } from "../../../sockets/socket.js";
  import { createLobby } from "../../../sockets/lobbySocket.js";

  let lobbyName = "";
  let minPlayers = 1;
  let maxPlayers = "";
  let password = "";

  const socket = getSocket();

  function submitCreateLobby() {
    createLobby({
      name: lobbyName || null,
      minPlayers: Number(minPlayers),
      maxPlayers: maxPlayers ? Number(maxPlayers) : null,
      password: password || null,
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
    <label class="create-lobby__label">Lobby Name</label>
    <input
      class="create-lobby__input"
      type="text"
      placeholder="Enter a festive name…"
      bind:value={lobbyName}
    />
    <small class="create-lobby__hint">Leave empty for a random name</small>
  </div>

  <div class="create-lobby__field">
    <label class="create-lobby__label">Minimum Players</label>
    <input
      class="create-lobby__input"
      type="number"
      min="1"
      bind:value={minPlayers}
    />
  </div>

  <div class="create-lobby__field">
    <label class="create-lobby__label">Maximum Players</label>
    <input
      class="create-lobby__input"
      type="number"
      min="1"
      placeholder="No limit"
      bind:value={maxPlayers}
    />
  </div>

  <div class="create-lobby__field">
    <label class="create-lobby__label">Password (optional)</label>
    <input
      class="create-lobby__input"
      type="password"
      placeholder="Leave empty for public lobby"
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
