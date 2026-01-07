<script>
  import PleaseLoginContent from "../components/PleaseLoginContent/PleaseLoginContent.svelte";
  import Button from "../components/ui/Button.svelte";
  import { userStore } from "../stores/userStore.js";
  import { lobbyStore, currentLobby } from "../stores/lobbyStore.js";
  import Modal from "../components/ui/Modal/Modal.svelte";
  import { navigate } from "svelte-routing";

  const {
    component: Component,
    params,
    requiresAuth = false,
    requiresLobbyMember = false,
  } = $props();

  const isAuthed = $derived(!!$userStore);
  const lobbyId = $derived(params?.id);
  const lobbyFromStore = $derived(
    $currentLobby?.id === lobbyId
      ? $currentLobby
      : $lobbyStore.find((lobby) => lobby.id === lobbyId)
  );
  const isLobbyMember = $derived(
    lobbyFromStore.players.some((player) => player.id === $userStore.id)
  );
</script>

{#if !requiresAuth || isAuthed}
  {#if !requiresLobbyMember || isLobbyMember}
    <Component {params} />
  {:else}
    <Modal open={true} onClose={() => navigate("/lobbies")}>
      <div class="guard">
        <h3>You need to join this lobby to play.</h3>
        <p>Ask the host for the lobby link, or pick another lobby to join.</p>
        <div class="guard__actions">
          <Button text="Back to lobbies" onClick={() => navigate("/lobbies")} />
        </div>
      </div>
    </Modal>
  {/if}

{:else}
  <Modal open={true} onClose={null} closable={false}>
      <PleaseLoginContent />
  </Modal>
{/if}

<style>
  .guard {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .guard__actions {
    display: flex;
    justify-content: flex-end;
  }
</style>
