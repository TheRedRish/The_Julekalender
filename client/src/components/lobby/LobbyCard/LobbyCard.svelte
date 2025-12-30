<script>
  import Badge from "../../ui/Badge.svelte";
  import Button from "../../ui/Button.svelte";
  import Avatar from "../../ui/Avatar.svelte";
  import { navigate } from "svelte-routing";
  import { getInitials } from "../../../util/stringUtil";
  import { copyLobbyLink } from "../../../services/lobbyService";

  const { lobby } = $props();
  const maxPlayers = $derived(lobby.game?.max_players || null);
  const totalSlots = $derived(maxPlayers || Math.max(lobby.players.length, 3));
  const openSlots = $derived(Math.max(totalSlots - lobby.players.length, 0));
  const playerCountText = $derived(
    maxPlayers ? `${lobby.players.length}/${maxPlayers} players` : `${lobby.players.length} players`
  );

  function viewLobby() {
    navigate(`/lobby/${lobby.id}`);
  }

</script>

<div class="lobby-card">
  <div class="lobby-card__header">
    <div class="lobby-card__title-row">
      <h3 class="lobby-card__title">{lobby.name}</h3>
      {#if lobby.password}
        <span class="lobby-card__lock" aria-label="Private lobby" title="Private lobby">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 10V8a5 5 0 0 1 10 0v2"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <rect
              x="5"
              y="10"
              width="14"
              height="11"
              rx="2"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </span>
      {/if}
    </div>
    <Badge text={lobby.status} />
  </div>

  <div class="lobby-card__players">
    <p class="lobby-card__game">{lobby.game.name}</p>
    <div class="lobby-card__avatars">
      {#each lobby.players as player}
        <Avatar label={getInitials(player.username)} />
      {/each}

      {#each { length: openSlots }}
        <Avatar label="?" empty />
      {/each}
    </div>

    <span class="lobby-card__count">{playerCountText}</span>
  </div>

  <div class="lobby-card__actions">
    <Button text="View Lobby" icon="▶" onClick={viewLobby} />
    <Button
      text=""
      icon="🔗"
      onClick={copyLobbyLink(lobby.id)}
      class="lobby-card__link"
    />
  </div>
</div>

<style>
  @import "./lobbyCard.css";
</style>
