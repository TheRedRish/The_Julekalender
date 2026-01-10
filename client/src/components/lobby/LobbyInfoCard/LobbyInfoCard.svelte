<script>
  import Button from "../../ui/Button.svelte";
  import { userStore } from "../../../stores/userStore.js";

  const { lobby, onGameStart = () => {}, onReconnect = () => {} } = $props();

  const minPlayersReached = $derived(lobby.players.length >= (lobby.game?.min_players ?? 0));

  const maxPlayersText = $derived(lobby.game?.max_players ?? "No limit");
  const minPlayersText = $derived(lobby.game?.min_players ?? "Unknown");
  const visibilityText = $derived(lobby.password ? "Private lobby" : "Public lobby");

  const isLeader = $derived($userStore && lobby.owner_id === $userStore.id);
  const isMember = $derived(
    $userStore && lobby.players.some((player) => player.id === $userStore.id)
  );
</script>

<div class="lobby-info">
  <h2 class="lobby-info__title">Lobby details</h2>
  {#if isMember}
    <div class="lobby-start">
      <div class="lobby-start__content">
        <p class="lobby-start__eyebrow">Start selected game</p>
        <h3 class="lobby-start__headline">
          {!minPlayersReached ? "Not enough players joined" : "Launch when everyone is ready"}
        </h3>
      </div>

      <div class="lobby-start__actions">
        {#if lobby.status === "In Game"}
          <Button text="Reconnect to game" onClick={onReconnect} />
        {:else if isLeader}
          <Button text="Start game" onClick={onGameStart} disabled={!minPlayersReached} />
        {:else}
          <p class="lobby-start__note">Only the lobby owner can start the game.</p>
        {/if}
      </div>
    </div>
  {/if}

  <div class="lobby-info__grid">
    <div class="lobby-info__item">
      <span class="lobby-info__label">Lobby ID</span>
      <span class="lobby-info__value lobby-info__value--mono">
        {lobby.id}
      </span>
    </div>

    <div class="lobby-info__item">
      <span class="lobby-info__label">Status</span>
      <span class="lobby-info__value">{lobby.status}</span>
    </div>

    <div class="lobby-info__item">
      <span class="lobby-info__label">Game</span>
      <span class="lobby-info__value">{lobby.game.name}</span>
    </div>

    <div class="lobby-info__item">
      <span class="lobby-info__label">Minimum players</span>
      <span class="lobby-info__value">{minPlayersText}</span>
    </div>

    <div class="lobby-info__item">
      <span class="lobby-info__label">Maximum players</span>
      <span class="lobby-info__value">{maxPlayersText}</span>
    </div>

    <div class="lobby-info__item">
      <span class="lobby-info__label">Visibility</span>
      <span class="lobby-info__value">{visibilityText}</span>
    </div>
  </div>
</div>

<style>
  @import "./lobbyInfoCard.css";
</style>
