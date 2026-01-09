<script>
  import PleaseLoginCard from "../components/auth/PleaseLoginCard/PleaseLoginCard.svelte";
  import { userStore } from "../stores/userStore.js";
  import { lobbyStore, currentLobby } from "../stores/lobbyStore.js";
  import Modal from "../components/ui/Modal/Modal.svelte";
  import { navigate } from "svelte-routing";
  import ReturnToLobbyCard from "../components/lobby/ReturnToLobbyCard/ReturnToLobbyCard.svelte";

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
      <ReturnToLobbyCard />
    </Modal>
  {/if}
{:else}
  <Modal open={true} onClose={null} closable={false}>
    <PleaseLoginCard />
  </Modal>
{/if}
