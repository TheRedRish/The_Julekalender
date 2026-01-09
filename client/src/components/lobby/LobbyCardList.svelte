<script>
    import { lobbyStore } from "../../stores/lobbyStore.js";
    import LobbyCard from "./LobbyCard/LobbyCard.svelte";
</script>

<div class="lobby-list">
    {#each $lobbyStore as lobby (lobby.id)}
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
