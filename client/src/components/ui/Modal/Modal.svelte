<script>
  const { open, onClose, closable = true } = $props();

  function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
      if (!closable) return;
      onClose();
    }
  }

  function onWindowKeydown(event) {
    if (!open) return;
    if (!closable) return;

    if (event.key === "Escape") {
      onClose();
    }
  }
</script>

<svelte:window onkeydown={onWindowKeydown} />

{#if open}
  <div class="modal-overlay" role="presentation" onclick={onBackdropClick}>
    <div class="modal" role="dialog" aria-modal="true">
      <slot />
    </div>
  </div>
{/if}

<style>
  @import "./modal.css";
</style>
