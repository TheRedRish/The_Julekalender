<script>
  import { registerUser } from "../../api/authApi.js";

  let email = "";
  let password = "";
  let error = "";
  let success = "";

  async function handleSubmit(event) {
    event.preventDefault();
    error = "";
    success = "";

    try {
      await registerUser(email, password);
      success = "User registered successfully!";
    } catch (err) {
      error = err.message || "Registration failed.";
    }
  }
</script>

<form onsubmit={handleSubmit} class="form">
  <h2>Create Account</h2>

  {#if error}<p class="error">{error}</p>{/if}
  {#if success}<p class="success">{success}</p>{/if}

  <label>Email</label>
  <input type="email" bind:value={email} required />

  <label>Password</label>
  <input type="password" bind:value={password} required minlength="6" />

  <button type="submit">Create User</button>
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
