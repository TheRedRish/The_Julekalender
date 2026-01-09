<script>
    import { navigate } from "svelte-routing";

    const loginPath = "/login";
    const registerPath = "/register";

    function goToLogin() {
        navigate(loginPath);
    }

    function goToRegister() {
        navigate(registerPath);
    }
</script>

<div class="please-login">
    <h2 class="please-login__title">Please log in</h2>

    <p class="please-login__text">You need to be logged in to view this content.</p>

    <div class="please-login__actions">
        <button
            type="button"
            class="please-login__btn please-login__btn--primary"
            onclick={goToLogin}
        >
            Go to login
        </button>

        <button type="button" class="please-login__btn" onclick={goToRegister}>
            Create account
        </button>
    </div>
</div>

<style>
    @import "./pleaseLoginCard.css";
</style>
