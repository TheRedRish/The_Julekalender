<script>
    const { active = "Fritz", onSelect = () => {} } = $props();

    const characters = ["Fritz", "Hansi", "Gynther"];

    const isActive = (name) => active?.toLowerCase() === name.toLowerCase();
</script>

<div class="switcher">
    {#each characters as name (name)}
        <button class:is-active={isActive(name)} type="button" onclick={() => onSelect(name)}>
            {name}
        </button>
    {/each}
</div>

<style>
    .switcher {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.85rem 1.1rem;
        background: #0f172a;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    button {
        appearance: none;
        border: 1px solid #334155;
        background: #111827;
        color: #e2e8f0;
        padding: 0.5rem 0.9rem;
        border-radius: 999px;
        font-weight: 600;
        cursor: pointer;
        transition:
            background 120ms ease,
            color 120ms ease,
            border-color 120ms ease;
    }

    button.is-active {
        background: #e2e8f0;
        color: #0f172a;
        border-color: #e2e8f0;
    }

    button:hover {
        border-color: #cbd5e1;
    }
</style>
