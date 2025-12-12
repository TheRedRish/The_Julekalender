<script>
  import { registerUser } from "../../../services/authService.js";
  import { user } from "../../../stores/userStore.js";
  import { navigate } from "svelte-routing";

  let email = "";
  let username = "";
  let password = "";
  let password2 = "";
  let error = "";
  let success = "";

  async function handleSubmit(event) {
    event.preventDefault();
    error = "";
    success = "";

    try {
      user.set(await registerUser(email, username, password));
      success = "User registered successfully!";
      navigate("/");
    } catch (err) {
      error = err.message || "Registration failed.";
    }
  }
</script>

<form onsubmit={handleSubmit} class="form">
  <h2>Create Account</h2>

  {#if error}<p class="error">{error}</p>{/if}
  {#if success}<p class="success">{success}</p>{/if}

  <label for="email">Email</label>
  <input type="email" id="email" bind:value={email} required />

  <label for="username">Username</label>
  <input type="text" id="username" bind:value={username} required />

  <label for="password1">Password</label>
  <input
    type="password"
    id="password1"
    bind:value={password}
    required
    minlength="6"
  />

  <label for="password2">Password Confirmation</label>
  <input
    type="password"
    id="password2"
    bind:value={password2}
    required
    minlength="6"
  />

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
