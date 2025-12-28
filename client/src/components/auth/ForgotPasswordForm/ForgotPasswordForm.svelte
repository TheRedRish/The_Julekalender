<script>
  import { requestPasswordReset } from "../../../services/authService.js";
  import { Link } from "svelte-routing";

  let email = "";
  let error = "";
  let success = "";

  async function handleSubmit(event) {
    event.preventDefault();
    error = "";
    success = "";

    try {
      await requestPasswordReset(email);
      success = "Password reset email sent!";
    } catch (err) {
      error = err.message || "Could not process request.";
    }
  }
</script>

<section class="auth-page page">
  <div class="auth-page__shell">
    <div class="auth-page__intro">
      <span class="auth-page__badge">Reset password</span>
      <h1 class="auth-page__title">We will email you a new password</h1>
      <p class="auth-page__subtitle">
        Enter the address connected to your account and we will send a fresh
        password so you can get back into your lobbies.
      </p>
      <div class="auth-page__meta">
        <span class="auth-page__pill">Fast delivery</span>
        <span class="auth-page__pill">Secure reset</span>
      </div>
    </div>

    <div class="auth-card">
      <div class="auth-card__header">
        <p class="auth-card__eyebrow">Forgot your password?</p>
        <h2 class="auth-card__title">Send a reset link</h2>
        <p class="auth-card__subtitle">
          We will generate a new password and email it to you instantly.
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

        <button type="submit" class="auth-form__submit">Send reset email</button>
      </form>

      <div class="auth-form__links">
        <Link to="/login" class="auth-form__link">Back to login</Link>
        <Link to="/register" class="auth-form__link">Create an account</Link>
      </div>
    </div>
  </div>
</section>

<style>
  @import "./forgotPasswordForm.css";
</style>