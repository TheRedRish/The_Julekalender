<script>
  import { lobbies } from "../../stores/lobbyStore.js";
  import LobbyCard from "./LobbyCard.svelte";
</script>

<div class="lobby-list">
  {#each $lobbies as lobby}
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
