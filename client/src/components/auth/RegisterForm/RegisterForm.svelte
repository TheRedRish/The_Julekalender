<script>
  import { registerUser } from "../../../services/authService.js";
  import { Link, navigate } from "svelte-routing";
  import { getRedirectQueryParam, getSafeRedirect } from "../../../util/query.js";

  let email = $state("test1@tester.com");
  let username = $state("Tester 1");
  let password = $state("123456");
  let password2 = $state("123456");
  let error = $state("");
  let success = $state("");
  const redirectQuery = getRedirectQueryParam();

  async function handleSubmit(event) {
    event.preventDefault();
    error = "";
    success = "";

    try {
      await registerUser(email, username, password);
      success = "User registered successfully!";
      navigate(getSafeRedirect("/lobbies"));
    } catch (err) {
      error = err.message || "Registration failed.";
    }
  }
</script>

<section class="auth-page page">
  <div class="auth-page__shell">
    <div class="auth-page__intro">
      <span class="auth-page__badge">Create account</span>
      <h1 class="auth-page__title">Join the lobby hub</h1>
      <p class="auth-page__subtitle">
        Save your Christmas lobbies, invite friends faster, and keep your games organized under one
        profile.
      </p>
      <div class="auth-page__meta">
        <span class="auth-page__pill">Instant lobby links</span>
        <span class="auth-page__pill">Profile sync</span>
        <span class="auth-page__pill">Password-protected rooms</span>
      </div>
    </div>

    <div class="auth-card">
      <div class="auth-card__header">
        <p class="auth-card__eyebrow">New here?</p>
        <h2 class="auth-card__title">Create your player</h2>
        <p class="auth-card__subtitle">Set up your account to start hosting and joining lobbies.</p>
      </div>

      <form onsubmit={handleSubmit} class="auth-form">
        {#if error}
          <p class="auth-status auth-status--error">{error}</p>
        {/if}
        {#if success}
          <p class="auth-status auth-status--success">{success}</p>
        {/if}

        <label class="auth-form__label" for="email">Email</label>
        <input class="auth-form__input" type="email" id="email" bind:value={email} required />

        <label class="auth-form__label" for="username">Username</label>
        <input class="auth-form__input" type="text" id="username" bind:value={username} required />

        <label class="auth-form__label" for="password1">Password</label>
        <input
          class="auth-form__input"
          type="password"
          id="password1"
          bind:value={password}
          required
          minlength="6"
        />
        <p class="auth-form__helper">Use at least 6 characters for security.</p>

        <label class="auth-form__label" for="password2">Password confirmation</label>
        <input
          class="auth-form__input"
          type="password"
          id="password2"
          bind:value={password2}
          required
          minlength="6"
        />

        <button type="submit" class="auth-form__submit">Create account</button>
      </form>

      <div class="auth-form__links">
        <Link to={`/login${redirectQuery}`} class="auth-form__link">Already have an account?</Link>
        <Link to="/forgot-password" class="auth-form__link">Need a password reset?</Link>
      </div>
    </div>
  </div>
</section>

<style>
  @import "./registerForm.css";
</style>
