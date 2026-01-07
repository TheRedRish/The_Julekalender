<script>
  import CreateLobbyCard from "../../components/lobby/CreateLobbyCard/CreateLobbyCard.svelte";
  import LobbyList from "../../components/lobby/LobbyCardList.svelte";
  import PleaseLoginCard from "../../components/auth/PleaseLoginCard/PleaseLoginCard.svelte";
  import Button from "../../components/ui/Button.svelte";
  import Modal from "../../components/ui/Modal/Modal.svelte";
  import { userStore } from "../../stores/userStore.js";
  import { clearUrlQuery, getQueryParam } from "../../util/query";

  let showCreateLobbyModal = $state(getQueryParam("create") || false);

  const isAuthed = $derived(!!$userStore);
</script>

<section class="lobby-overview page">
  <div class="lobby-overview__cta">
    <Button
      text="Create New Lobby"
      icon="+"
      onClick={() => (showCreateLobbyModal = true)}
    />
  </div>

  <Modal
    open={showCreateLobbyModal}
    onClose={() => {(showCreateLobbyModal = false); clearUrlQuery()}}
  >
    {#if isAuthed}
        <CreateLobbyCard />
    {:else}
        <PleaseLoginCard />
    {/if}
  </Modal>

  <h2 class="lobby-overview__title">Available Lobbies</h2>

  <LobbyList />
</section>

<style>
  @import "./lobbyOverview.css";
</style>
