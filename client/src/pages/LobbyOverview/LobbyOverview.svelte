<script>
  import LobbyList from "../../components/lobby/LobbyList.svelte";
  import Button from "../../components/ui/Button.svelte";

  function createLobby() {}
</script>

<section class="lobby-overview">
  <div class="lobby-overview__cta">
    <Button text="Create New Lobby" icon="+" onClick={createLobby} />
  </div>

  <h2 class="lobby-overview__title">Available Lobbies</h2>

  <LobbyList />
</section>

<style>
  @import "./lobbyOverview.css";
</style>
