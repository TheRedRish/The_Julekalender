<script>
    const { label, empty = false } = $props();
</script>

<div class="ui-avatar {empty ? 'ui-avatar--empty' : ''}">
    {label}
</div>

<style>
    .ui-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-text-inverse);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
    }

    .ui-avatar--empty {
        background: var(--color-border-strong);
        color: var(--color-text-muted);
    }
</style>
