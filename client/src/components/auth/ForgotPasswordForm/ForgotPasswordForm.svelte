<script>
  import { requestPasswordReset } from "../../../services/authService.js";

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

<form onsubmit={handleSubmit} class="form">
  <h2>Forgot Password</h2>

  {#if error}<p class="error">{error}</p>{/if}
  {#if success}<p class="success">{success}</p>{/if}

  <label for="email">Email</label>
  <input type="email" id="email" bind:value={email} required />

  <button type="submit">Send Reset Link</button>
</form>

<style>
  .form {
    max-width: 320px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>
