<script>
  import { Application } from "pixi.js";
  import { onMount } from "svelte";

  let container;
  let canvas;
  let app;

  onMount(async () => {
    app = new Application();

    await app.init({
      canvas,
      resizeTo: container,
      background: "white",
      antialias: true,
    });
  });
</script>

<div class="canvas-shell">
  <div class="canvas-host" bind:this={container}>
    <canvas bind:this={canvas}></canvas>
  </div>
</div>

<style>
  .canvas-shell {
    height: 100%;
    width: 100%;
    display: flex;
    background: #0b1628;
  }

  .canvas-host {
    position: relative;
    flex: 1 1 auto;
    min-height: 320px;
    overflow: hidden;
  }

  canvas {
    display: block;
  }

  .placeholder {
    position: absolute;
    top: 12px;
    left: 12px;
    margin: 0;
    color: #94a3b8;
    font-size: 0.95rem;
    pointer-events: none;
  }
</style>
