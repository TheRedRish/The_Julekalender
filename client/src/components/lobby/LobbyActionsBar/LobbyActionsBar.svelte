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
  } = $props();
</script>

<div class="lobby-actions">
  <div class="lobby-actions__details">
    <p class="lobby-actions__eyebrow">Lobby</p>
    <div class="lobby-actions__title-row">
      <h1 class="lobby-actions__title">{lobby?.name ?? "Lobby"}</h1>
      {#if lobby?.status}
        <Badge text={lobby.status} />
      {/if}
    </div>
    <p class="lobby-actions__subtitle">
      Share the link or join to meet other players.
    </p>
  </div>

  <div class="lobby-actions__buttons">
    <Button
      text="Copy link"
      onClick={onCopyLink}
      class="lobby-actions__button lobby-actions__button--ghost"
    />

    {#if isMember}
      <Button
        text="Leave lobby"
        icon="👋"
        onClick={onLeave}
        class="lobby-actions__button"
      />
    {:else}
      <Button
        text={isFull ? "Lobby is full" : "Join lobby"}
        onClick={isFull ? undefined : onJoin}
        class="lobby-actions__button"
      />
    {/if}
  </div>
</div>

<style>
  @import "./lobbyActionsBar.css";
</style>
