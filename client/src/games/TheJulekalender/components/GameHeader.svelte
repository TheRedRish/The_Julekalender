<script>
  const phase = "Waiting in lobby";
  const goal = "Get ready for the next round";
</script>

<div class="game-header-bar">
  <div class="status">
    <p class="label">Current phase</p>
    <p class="value">{phase}</p>
  </div>
  <div class="status">
    <p class="label">Current goal</p>
    <p class="value">{goal}</p>
  </div>
</div>

<style>
  .game-header-bar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
    align-items: center;
    padding: 0.85rem 1.1rem;
    background: #0f172a;
    color: #e2e8f0;
  }

  .status {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .label {
    margin: 0;
    font-size: 0.85rem;
    letter-spacing: 0.01em;
    color: #cbd5e1;
  }

  .value {
    margin: 0;
    font-weight: 600;
    font-size: 1rem;
  }
</style>
