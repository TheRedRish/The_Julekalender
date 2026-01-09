<script>
  const { open, onClose, closable = true, children } = $props();

  function onBackdropClick(event) {
    if (!closable) return;
    if (event.target === event.currentTarget) {
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

<svelte:body class:modal-open={open} />
<svelte:window onkeydown={onWindowKeydown} />

{#if open}
  <div class="modal-overlay" role="presentation" onclick={onBackdropClick}>
    <div class="modal" role="dialog" aria-modal="true">
      {@render children?.()}
    </div>
  </div>
{/if}

<style>
  @import "./modal.css";
</style>
