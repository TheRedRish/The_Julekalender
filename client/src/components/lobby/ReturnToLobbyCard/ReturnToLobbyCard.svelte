<script>
  import { navigate } from "svelte-routing";
  import Button from "../../ui/Button.svelte";
</script>

<div class="guard">
  <h3>You need to join this lobby to play.</h3>
  <p>Ask the host for the lobby link, or pick another lobby to join.</p>
  <div class="guard__actions">
    <Button text="Back to lobbies" onClick={() => navigate("/lobbies")} />
  </div>
</div>

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
