<script>
  import { Link } from "svelte-routing";
  import { user } from "../../stores/userStore.js";
  import { navigate } from "svelte-routing";
  import { logoutUser } from "../../api/authApi.js";

  const { title, subtitle } = $props();

  async function handleLogout(event) {
    event.preventDefault();

    try {
      await logoutUser();
      user.set(null);
      navigate("/");
    } catch (err) {
      // TODO show error with toast
    }
  }
</script>

<header class="header">
  <div class="header__container">
    <div class="header__branding">
      <Link to="/" class="header__logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="header__logo-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 2l3 5h-2l4 6h-3l5 7H5l5-7H7l4-6H9l3-5z"
          />
        </svg>
      </Link>

      <div class="header__title-group">
        <span class="header__title">{title}</span>
        <span class="header__subtitle">{subtitle}</span>
      </div>
    </div>

    {#if $user}
      <div class="header__user">
        <Link to="/profile" class="header__user-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="header__user-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A8 8 0 1118.878 6.196 8 8 0 015.12 17.804z"
            />
          </svg>
          <span class="header__username">{$user.username}</span>
        </Link>
        <form onsubmit={handleLogout}>
          <button type="submit" class="header__logout">Logout</button>
        </form>
      </div>
    {:else}
      <div class="header__links">
        <Link to="/login" class="header__link">Login</Link>
        <Link to="/register" class="header__link">Register</Link>
      </div>
    {/if}
  </div>
</header>

<style>
  @import "./header.css";
</style>
