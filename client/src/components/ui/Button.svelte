<script>
    const { text, icon = undefined, onClick, disabled = false, ...restProps } = $props();
</script>

<button class="ui-button {restProps.class || ''}" onclick={onClick} {disabled}>
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

    .ui-button[disabled] {
        background: var(--color-surface-muted);
        color: var(--color-text-muted);
        border: 1px solid var(--color-border);
        cursor: not-allowed;
    }
</style>
