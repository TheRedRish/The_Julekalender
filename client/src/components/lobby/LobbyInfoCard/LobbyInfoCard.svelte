<script>
  const { lobby } = $props();

  const maxPlayersText = $derived(
    lobby.max_players ? lobby.max_players : "No limit"
  );
  const minPlayersText = $derived(lobby.min_players ?? 1);
  const visibilityText = $derived(
    lobby.password ? "Private lobby" : "Public lobby"
  );
  const spotsRemaining = $derived(
    lobby.max_players
      ? Math.max(lobby.max_players - (lobby.players.length || 0), 0)
      : null
  );
</script>

<div class="lobby-info">
  <h2 class="lobby-info__title">Lobby details</h2>

  <div class="lobby-info__grid">
    <div class="lobby-info__item">
      <span class="lobby-info__label">Lobby ID</span>
      <span class="lobby-info__value lobby-info__value--mono">
        {lobby.id ?? "Unknown"}
      </span>
    </div>

    <div class="lobby-info__item">
      <span class="lobby-info__label">Status</span>
      <span class="lobby-info__value">{lobby.status ?? "Unknown"}</span>
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

    <div class="lobby-info__item">
      <span class="lobby-info__label">Spots remaining</span>
      <span class="lobby-info__value">
        {spotsRemaining === null ? "Unlimited" : spotsRemaining}
      </span>
    </div>
  </div>
</div>

<style>
  @import "./lobbyInfoCard.css";
</style>
