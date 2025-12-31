<script lang="ts">
  const { header, canvas, footer } = $props();
</script>

<section class="game-layout">
  <header class="game-header">
    {@render header?.()}
  </header>

  <main class="game-main">
    {@render canvas?.()}
  </main>

  <footer class="game-footer">
    {@render footer?.()}
  </footer>
</section>

<style>
  .game-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #f8fafc;
    color: #0f172a;
  }

  .game-header,
  .game-footer {
    flex: 0 0 auto;
  }

  .game-main {
    flex: 1 1 auto;
    min-height: 0;
  }
</style>
