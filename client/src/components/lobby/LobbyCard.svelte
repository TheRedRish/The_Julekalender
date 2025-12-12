<script>
  import Badge from "../ui/Badge.svelte";
  import Button from "../ui/Button.svelte";
  import Avatar from "../ui/Avatar.svelte";
  import { navigate } from "svelte-routing";

  let { lobby } = $props();

  function viewLobby() {
    navigate(`/lobby/${lobby.id}`);
  }

  function copyLobbyLink() {
    navigator.clipboard.writeText(
      window.location.origin + `/lobby/${lobby.id}`
    );
    // alert("Copied lobby link to clipboard!"); TODO use toast
  }
</script>

<div class="lobby-card">
  <div class="lobby-card__header">
    <h3 class="lobby-card__title">{lobby.name}</h3>
    <Badge text={lobby.status} />
  </div>

  <div class="lobby-card__players">
    <div class="lobby-card__avatars">
      {#each lobby.players as player}
        <Avatar label={player.name} />
      {/each}

      {#each Array(3 - lobby.players.length) as _}
        <Avatar label="?" empty />
      {/each}
    </div>

    <span class="lobby-card__count">
      {lobby.players.length}/3 players
    </span>
  </div>

  <div class="lobby-card__actions">
    <Button text="View Lobby" icon="▶" onClick={viewLobby} />
    <Button
      text=""
      icon="🔗"
      onClick={copyLobbyLink}
      class="lobby-card__link"
    />
  </div>
</div>

<style>
  @import "./lobbyCard.css";
</style>
