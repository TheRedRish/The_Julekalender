<script>
  let { text, icon = undefined, onClick, ...restProps } = $props();
</script>

<button class="ui-button {restProps.class || ''}" onclick={onClick}>
  {#if icon}<span>{icon}</span>{/if}
  {text}
</button>

<style>
  .ui-button {
    background: var(--color-primary);
    color: var(--color-text-inverse);
    border: none;
    border-radius: 12px;
    padding: 10px 18px;
    cursor: pointer;
  }
</style>
