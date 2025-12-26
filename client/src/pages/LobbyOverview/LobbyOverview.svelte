<script>
  import CreateLobbyCard from "../../components/lobby/CreateLobbyCard/CreateLobbyCard.svelte";
  import LobbyList from "../../components/lobby/LobbyCardList.svelte";
  import Button from "../../components/ui/Button.svelte";
  import Modal from "../../components/ui/Modal/Modal.svelte";

  let showCreateLobbyModal = $state(false);
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
    onClose={() => (showCreateLobbyModal = false)}
  >
    <CreateLobbyCard />
  </Modal>

  <h2 class="lobby-overview__title">Available Lobbies</h2>

  <LobbyList />
</section>

<style>
  @import "./lobbyOverview.css";
</style>
