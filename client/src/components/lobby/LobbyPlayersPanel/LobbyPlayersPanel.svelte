<script>
  import { getInitials } from "../../../util/stringUtil";
  import Avatar from "../../ui/Avatar.svelte";

  const {
    players = [],
    maxPlayers = null,
    currentUserId = null,
    canKick = false,
    leaderId = null,
    onKick = () => {}
  } = $props();

  const totalSlots = $derived(maxPlayers || Math.max(players.length, 3));
  const openSlots = $derived(Math.max(totalSlots - players.length, 0));

  function getPlayerTags(player) {
    const tags = [];
    if (player.id === currentUserId) {
      tags.push({ label: "You", className: "lobby-players__tag--self" });
    }
    if (player.id === leaderId) {
      tags.push({ label: "Leader", className: "lobby-players__tag--leader" });
    }
    return tags;
  }
</script>

<div class="lobby-players">
  <div class="lobby-players__header">
    <h2 class="lobby-players__title">Players</h2>
    <span class="lobby-players__count">
      {players.length}{#if maxPlayers}
        / {maxPlayers}{/if} players
    </span>
  </div>

  <div class="lobby-players__grid">
    {#each players as player (player.id)}
      <div
        class="lobby-players__card"
        class:lobby-players__card--self={player.id === currentUserId}
      >
        <Avatar label={getInitials(player.username)} />
        <div class="lobby-players__info">
          <span class="lobby-players__name">{player.username}</span>
          {#if getPlayerTags(player).length > 0}
            <div class="lobby-players__tags">
              {#each getPlayerTags(player) as tag (tag.label)}
                <span class={`lobby-players__tag ${tag.className}`}>
                  {tag.label}
                </span>
              {/each}
            </div>
          {/if}
        </div>
        {#if canKick && player.id !== leaderId}
          <button
            type="button"
            class="lobby-players__kick"
            onclick={() => onKick(player.id)}
          >
            Kick
          </button>
        {/if}
      </div>
    {/each}

    {#each Array.from({ length: openSlots }) as _, index (index)}
      <div class="lobby-players__card lobby-players__card--empty">
        <Avatar label="?" empty />
        <div class="lobby-players__info">
          <span class="lobby-players__name">Open slot</span>
          {#if maxPlayers}
            <span class="lobby-players__tag">
              Slot {players.length + index + 1}
            </span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  @import "./lobbyPlayersPanel.css";
</style>
