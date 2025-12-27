<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import LobbyActionsBar from "../../components/lobby/LobbyActionsBar/LobbyActionsBar.svelte";
  import LobbyPlayersPanel from "../../components/lobby/LobbyPlayersPanel/LobbyPlayersPanel.svelte";
  import LobbyInfoCard from "../../components/lobby/LobbyInfoCard/LobbyInfoCard.svelte";
  import { lobbyStore, currentLobby } from "../../stores/lobbyStore.js";
  import { userStore } from "../../stores/userStore.js";
  import { gamesStore, loadGames } from "../../stores/gameStore.js";
  import {
    joinLobby,
    leaveLobby,
    updateLobbySettings,
    kickPlayer,
  } from "../../sockets/lobbySocket.js";
  import { copyLobbyLink } from "../../services/lobbyService";
  import { toastError } from "../../util/toast";
  import Button from "../../components/ui/Button.svelte";
  import Modal from "../../components/ui/Modal/Modal.svelte";
  import JoinLobbyPassword from "../../components/lobby/JoinLobbyPassword/JoinLobbyPassword.svelte";

  const { params = {} } = $props();
  const lobbyId = $derived(params.id);

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
      lobby.players.some((player) => player.id === $userStore.id)
  );

  const isFull = $derived(
    lobby.max_players && lobby.players.length >= lobby.max_players
  );

  const isLeader = $derived(
    lobby && $userStore && lobby.owner_id === $userStore.id
  );

  let editName = $state("");
  let editGameId = $state("");
  let editPassword = $state("");
  let isEditing = $state(false);
  let showPasswordModal = $state(false);
  let joinError = $state("");
  const games = $derived($gamesStore);
  const editGame = $derived(games.find((game) => game.id === editGameId));

  onMount(() => {
    loadGames();
  });

  $effect(() => {
    if (!isLeader) {
      isEditing = false;
    }
  });

  $effect(() => {
    if (!lobby || isEditing) return;
    editName = lobby.name;
    editGameId = lobby.game_id;
    editPassword = lobby.password;
  });

  $effect(() => {
    if (isMember) {
      showPasswordModal = false;
      joinError = "";
    }
  });

  function openPasswordModal() {
    joinError = "";
    showPasswordModal = true;
  }

  function closePasswordModal() {
    showPasswordModal = false;
    joinError = "";
  }

  async function handleJoin(passwordValue = null) {
    if (lobby.password && !isMember && !isLeader && passwordValue === null) {
      openPasswordModal();
      return;
    }

    try {
      await joinLobby(lobbyId, passwordValue);
      closePasswordModal();
    } catch (error) {
      const message = error.message || "Failed to join lobby.";
      if (lobby.password) {
        joinError = message;
        showPasswordModal = true;
      } else {
        toastError(message);
      }
    }
  }

  function handleSubmitPassword(value) {
    if (!value) {
      joinError = "Please enter the lobby password.";
      return;
    }
    handleJoin(value);
  }

  function handleLeave() {
    leaveLobby(lobbyId);
    currentLobby.set(null);
    navigate("/lobbies");
  }

  async function handleCopyLink() {
    copyLobbyLink(lobbyId);
  }

  function handleSaveSettings() {
    updateLobbySettings(lobbyId, {
      name: editName.trim(),
      password: editPassword,
      gameId: editGameId,
    });
    isEditing = false;
  }

  function handleKick(playerId) {
    if (!playerId) return;
    kickPlayer(lobbyId, playerId);
  }

  function handleStartEdit() {
    if (!isLeader) return;
    editName = lobby.name;
    editGameId = lobby.game_id;
    editPassword = lobby.password;
    isEditing = true;
  }

  function handleCancelEdit() {
    editName = lobby.name;
    editGameId = lobby.game_id;
    editPassword = lobby.password;
    isEditing = false;
  }
</script>

{#if !lobby}
  <section class="lobby-page page lobby-page--center">
    <div class="lobby-page__empty">
      <h2>Lobby not found</h2>
      <p>Try returning to the lobby list to join another game.</p>
      <button class="lobby-page__back" onclick={() => navigate("/lobbies")}>
        Back to lobby list
      </button>
    </div>
  </section>
{:else}
  <section class="lobby-page page">
    <div class="lobby-page__back-row">
      <Button
        text="Back to lobbies"
        icon="←"
        onClick={() => navigate("/lobbies")}
      />
    </div>
    <LobbyActionsBar
      {lobby}
      {isMember}
      {isFull}
      onJoin={handleJoin}
      onLeave={handleLeave}
      onCopyLink={handleCopyLink}
      onEdit={handleStartEdit}
      {isLeader}
    />

    {#if isLeader && isEditing}
      <div class="lobby-page__leader-card">
        <div class="lobby-page__leader-header">
          <div>
            <p class="lobby-page__eyebrow">Leader controls</p>
            <h3 class="lobby-page__leader-title">Manage your lobby</h3>
          </div>
          <div>
            <Button
              text="Close"
              onClick={handleCancelEdit}
              class="lobby-page__close"
            />
          </div>
        </div>

        <div class="lobby-page__controls">
          <label class="lobby-page__field">
            <span>Game</span>
            <select bind:value={editGameId}>
              {#each games as game}
                <option value={game.id}>{game.name}</option>
              {/each}
            </select>
            <small class="lobby-page__hint">
              Min {editGame.min_players}
              {#if editGame.max_players}
                - Max {editGame.max_players}
              {:else}
                - No max
              {/if}
            </small>
          </label>
          <label class="lobby-page__field">
            <span>Lobby name</span>
            <input type="text" bind:value={editName} />
          </label>
          <label class="lobby-page__field">
            <span>Password (blank = none)</span>
            <input type="text" bind:value={editPassword} />
          </label>
        </div>

        <div class="lobby-page__actions">
          <button class="lobby-page__save" onclick={handleSaveSettings}>
            Save changes
          </button>
        </div>
      </div>
    {/if}

    <div class="lobby-page__grid">
      <LobbyPlayersPanel
        players={lobby.players}
        maxPlayers={lobby.max_players}
        currentUserId={$userStore.id}
        canKick={isLeader}
        leaderId={lobby.owner_id}
        onKick={handleKick}
      />

      <LobbyInfoCard {lobby} />
    </div>
  </section>
{/if}

<Modal open={showPasswordModal} onClose={closePasswordModal}>
  <JoinLobbyPassword
    lobbyName={lobby.name}
    error={joinError}
    onSubmit={handleSubmitPassword}
    onCancel={closePasswordModal}
  />
</Modal>

<style>
  @import "./lobbyPage.css";
</style>
