<script>
  import Badge from "../../ui/Badge.svelte";
  import Button from "../../ui/Button.svelte";

  const {
    lobby,
    isMember = false,
    isFull = false,
    onJoin = () => {},
    onLeave = () => {},
    onCopyLink = () => {},
    onEdit = null,
    isLeader = false,
  } = $props();

  const isInGame = $derived(lobby.status === "In Game");
  const isJoinLobbyButtonDisabled = $derived(isInGame || isFull);
  const joinLobbyButtonText = $derived(isInGame ? "In game" : isFull ? "Full" : "Join lobby");
</script>

<div class="lobby-actions">
  <div class="lobby-actions__details">
    <p class="lobby-actions__eyebrow">Lobby</p>
    <div class="lobby-actions__title-row">
      <h1 class="lobby-actions__title">{lobby.name}</h1>
      {#if lobby.status}
        <Badge text={lobby.status} />
      {/if}
    </div>
    <p class="lobby-actions__subtitle">
      Game: {lobby.game.name}. Share the link or join to meet other players.
    </p>
  </div>

  <div class="lobby-actions__buttons">
    <Button
      text=""
      icon="🔗"
      onClick={onCopyLink}
      class="lobby-actions__button lobby-actions__button--ghost"
    />

    {#if isLeader && onEdit}
      <Button
        text="Edit lobby"
        onClick={onEdit}
        class="lobby-actions__button lobby-actions__button--ghost"
      />
    {/if}

    {#if isMember}
      <Button text="Leave lobby" icon="◀" onClick={onLeave} class="lobby-actions__button" />
    {:else}
      <Button
        text={joinLobbyButtonText}
        onClick={isJoinLobbyButtonDisabled
          ? undefined
          : () => {
              onJoin();
            }}
        class="lobby-actions__button"
        disabled={isJoinLobbyButtonDisabled}
      />
    {/if}
  </div>
</div>

<style>
  @import "./lobbyActionsBar.css";
</style>
