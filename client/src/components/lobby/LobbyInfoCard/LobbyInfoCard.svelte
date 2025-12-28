<script>
  import { navigate } from "svelte-routing";
  import Button from "../../ui/Button.svelte";

  const { lobby, onGameStart = () => {} } = $props();

  const maxPlayersText = $derived(
    lobby.max_players ? lobby.max_players : "No limit"
  );
  const minPlayersText = $derived(lobby.min_players);
  const visibilityText = $derived(
    lobby.password ? "Private lobby" : "Public lobby"
  );
</script>

<div class="lobby-info">
  <h2 class="lobby-info__title">Lobby details</h2>

  <div class="lobby-start">
    <div class="lobby-start__content">
      <p class="lobby-start__eyebrow">Start selected game</p>
      <h3 class="lobby-start__headline">Launch when everyone is ready</h3>
    </div>

    <div class="lobby-start__actions">
      <Button text="Start game" onClick={onGameStart} />
    </div>
  </div>

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
