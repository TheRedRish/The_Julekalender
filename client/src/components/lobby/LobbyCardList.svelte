<script>
  import { onMount } from "svelte";
  import { lobbyStore } from "../../stores/lobbyStore.js";
  import LobbyCard from "./LobbyCard/LobbyCard.svelte";
  import { getSocket } from "../../sockets/socket.js";
  import { navigate } from "svelte-routing";
</script>

<div class="lobby-list">
  {#each $lobbyStore as lobby}
    <LobbyCard {lobby} />
  {/each}
</div>

<style>
  .lobby-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 24px;
  }
</style>
