<script>
  import { loginUser } from "../../../services/authService.js";
  import { user } from "../../../stores/userStore.js";
  import { navigate } from "svelte-routing";

  let email = "someRandom@email.com";
  let password = "123456";
  let error = "";
  let success = "";

  async function handleSubmit(event) {
    event.preventDefault();
    error = "";
    success = "";

    try {
      user.set(await loginUser(email, password));
      success = "Login successful!";
      navigate("/");
    } catch (err) {
      error = err.message || "Login failed.";
    }
  }
</script>

<form onsubmit={handleSubmit} class="form">
  <h2>Login</h2>

  {#if error}<p class="error">{error}</p>{/if}
  {#if success}<p class="success">{success}</p>{/if}

  <label for="email">Email</label>
  <input type="email" id="email" bind:value={email} required />

  <label for="password">Password</label>
  <input type="password" id="password" bind:value={password} required />

  <button type="submit">Login</button>
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
