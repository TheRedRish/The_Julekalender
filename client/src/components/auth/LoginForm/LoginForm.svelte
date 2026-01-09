<script>
  import { loginUser } from "../../../services/authService.js";
  import { Link, navigate } from "svelte-routing";

  let email = $state("test1@tester.com");
  let password = $state("password1");
  let error = $state("");
  let success = $state("");

  async function handleSubmit(event) {
    event.preventDefault();
    error = "";
    success = "";

    try {
      await loginUser(email, password);
      success = "Login successful!";
      navigate("/lobbies");
    } catch (err) {
      error = err.message || "Login failed.";
    }
  }
</script>

<section class="auth-page page">
  <div class="auth-page__shell">
    <div class="auth-page__intro">
      <span class="auth-page__badge">Account access</span>
      <h1 class="auth-page__title">Log in to your lobby</h1>
      <p class="auth-page__subtitle">
        Pick up saved games, join friends instantly, and keep your Christmas
        rooms organized.
      </p>
      <div class="auth-page__meta">
        <span class="auth-page__pill">Secure sign-in</span>
        <span class="auth-page__pill">Fast lobby handoff</span>
        <span class="auth-page__pill">Stay synced</span>
      </div>
    </div>

    <div class="auth-card">
      <div class="auth-card__header">
        <p class="auth-card__eyebrow">Welcome back</p>
        <h2 class="auth-card__title">Sign in</h2>
        <p class="auth-card__subtitle">
          Use your email and password to continue to the lobby list.
        </p>
      </div>

      <form onsubmit={handleSubmit} class="auth-form">
        {#if error}
          <p class="auth-status auth-status--error">{error}</p>
        {/if}
        {#if success}
          <p class="auth-status auth-status--success">{success}</p>
        {/if}

        <label class="auth-form__label" for="email">Email</label>
        <input
          class="auth-form__input"
          type="email"
          id="email"
          bind:value={email}
          required
        />

        <label class="auth-form__label" for="password">Password</label>
        <input
          class="auth-form__input"
          type="password"
          id="password"
          bind:value={password}
          required
        />

        <button type="submit" class="auth-form__submit">Login</button>
      </form>

      <div class="auth-form__links">
        <Link to="/forgot-password" class="auth-form__link">
          Forgot password?
        </Link>
        <Link to="/register" class="auth-form__link">Create account</Link>
      </div>
    </div>
  </div>
</section>

<style>
  @import "./loginForm.css";
</style>
