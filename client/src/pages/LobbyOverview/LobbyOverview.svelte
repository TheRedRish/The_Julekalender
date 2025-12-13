<script>
  import CreateLobbyCard from "../../components/lobby/CreateLobbyCard/CreateLobbyCard.svelte";
  import LobbyList from "../../components/lobby/LobbyCardList.svelte";
  import Button from "../../components/ui/Button.svelte";
  import Modal from "../../components/ui/Modal/Modal.svelte";
  import PleaseLoginContent from "../../components/PleaseLoginContent/PleaseLoginContent.svelte";
  import { userStore } from "../../stores/userStore";

  let showCreateLobby = false;
  let showLoginModal = false;

  $: showLoginModal = $userStore === null;
</script>

<section class="lobby-overview page">
  <div class="lobby-overview__cta">
    <Button
      text="Create New Lobby"
      icon="+"
      onClick={() => (showCreateLobby = true)}
    />
  </div>

  <Modal open={showCreateLobby} onClose={() => (showCreateLobby = false)}>
    <CreateLobbyCard />
  </Modal>

  <Modal open={showLoginModal} onClose={() => (showLoginModal = false)} closable={false}>
    <PleaseLoginContent />
  </Modal>

  <h2 class="lobby-overview__title">Available Lobbies</h2>

  <LobbyList />
</section>

<style>
  @import "./lobbyOverview.css";
</style>
