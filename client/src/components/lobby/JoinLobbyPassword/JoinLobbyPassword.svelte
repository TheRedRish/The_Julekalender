<script>
    const { lobbyName = "Lobby", error = "", onSubmit = () => {}, onCancel = () => {} } = $props();

    let password = $state("");

    const visibleError = $derived(error);

    function handleSubmit() {
        onSubmit(password);
    }
</script>

<div class="join-password">
    <h3 class="join-password__title">Enter lobby password</h3>
    <p class="join-password__subtitle">
        {lobbyName} is locked. Enter the password to join.
    </p>

    <label class="join-password__field">
        <span>Password</span>
        <input
            type="password"
            placeholder="Enter password"
            bind:value={password}
            onkeydown={(event) => event.key === "Enter" && handleSubmit()}
        />
    </label>

    {#if visibleError}
        <p class="join-password__error">{visibleError}</p>
    {/if}

    <div class="join-password__actions">
        <button
            class="join-password__button join-password__button--ghost"
            onclick={() => onCancel()}
        >
            Cancel
        </button>
        <button class="join-password__button" onclick={() => handleSubmit()}> Join lobby </button>
    </div>
</div>

<style>
    @import "./joinLobbyPassword.css";
</style>
