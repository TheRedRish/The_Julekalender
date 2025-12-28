<script>
  // Entry point for The Julekalender game UI.
  const { params = {} } = $props();

  const lobbyId = $derived(params.id);

  
</script>

<section class="tj-container">
  <header>
    <h1>The Julekalender</h1>
    <p>Scaffolding placeholder for the game experience.</p>
  </header>

  <div class="tj-body">
    <p>Build game pages and components inside this folder.</p>
    {#if lobbyId}
      <p>Current lobby: {lobbyId}</p>
    {/if}
  </div>
</section>

<style>
  .tj-container {
    padding: 1.5rem;
    border-radius: 12px;
    background: linear-gradient(120deg, #f7fafc, #eef2f7);
    border: 1px solid #d8dfea;
    color: #0f172a;
  }

  header h1 {
    margin: 0;
    font-size: 1.5rem;
    letter-spacing: 0.03em;
  }

  header p {
    margin: 0.35rem 0 0.8rem;
    color: #334155;
  }

  .tj-body {
    padding: 1rem;
    background: #fff;
    border: 1px dashed #cbd5e1;
    border-radius: 10px;
  }
</style>
