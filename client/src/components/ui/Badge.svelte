<script>
  const { text } = $props();
</script>

<span class="ui-badge">{text}</span>

<style>
  .ui-badge {
    background: var(--color-chip-bg);
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 0.75rem;
  }
</style>
