<script>
  import { navigate } from "svelte-routing";
  import LobbyActionsBar from "../../components/lobby/LobbyActionsBar/LobbyActionsBar.svelte";
  import LobbyPlayersPanel from "../../components/lobby/LobbyPlayersPanel/LobbyPlayersPanel.svelte";
  import LobbyInfoCard from "../../components/lobby/LobbyInfoCard/LobbyInfoCard.svelte";
  import PleaseLoginContent from "../../components/PleaseLoginContent/PleaseLoginContent.svelte";
  import { lobbyStore, currentLobby } from "../../stores/lobbyStore.js";
  import { userStore } from "../../stores/userStore.js";
  import { joinLobby, leaveLobby } from "../../sockets/lobbySocket.js";
  import { copyLobbyLink } from "../../services/lobbyService";

  const { params = {} } = $props();
  const lobbyId = $derived(params?.id);

  const lobbyFromList = $derived(
    $lobbyStore.find((item) => item.id === lobbyId)
  );

  const lobby = $derived(
    $currentLobby && $currentLobby.id === lobbyId
      ? $currentLobby
      : lobbyFromList
  );

  const isMember = $derived(
    lobby &&
      $userStore &&
      lobby.players?.some((player) => player.id === $userStore.id)
  );

  const isFull = $derived(
    lobby?.max_players && lobby.players?.length >= lobby.max_players
  );

  function handleJoin() {
    joinLobby(lobbyId);
  }

  function handleLeave() {
    leaveLobby(lobbyId);
    navigate("/");
  }

  async function handleCopyLink() {
    copyLobbyLink(lobbyId);
  }
</script>

{#if !$userStore}
  <section class="lobby-page page">
    <div class="lobby-page__card">
      <PleaseLoginContent />
    </div>
  </section>
{:else if !lobby}
  <section class="lobby-page page lobby-page--center">
    <div class="lobby-page__empty">
      <h2>Lobby not found</h2>
      <p>Try returning to the lobby list to join another game.</p>
      <button class="lobby-page__back" onclick={() => navigate("/")}>
        Back to lobby list
      </button>
    </div>
  </section>
{:else}
  <section class="lobby-page page">
    <LobbyActionsBar
      {lobby}
      {isMember}
      {isFull}
      onJoin={handleJoin}
      onLeave={handleLeave}
      onCopyLink={handleCopyLink}
    />

    <div class="lobby-page__grid">
      <LobbyPlayersPanel
        players={lobby.players}
        maxPlayers={lobby.max_players}
        currentUserId={$userStore?.id}
      />

      <LobbyInfoCard {lobby} />
    </div>
  </section>
{/if}

<style>
  @import "./lobbyPage.css";
</style>
