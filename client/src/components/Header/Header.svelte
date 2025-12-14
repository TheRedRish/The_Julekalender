<script>
  import { Link } from "svelte-routing";
  import { navigate } from "svelte-routing";
  import { userStore } from "../../stores/userStore.js";
  import { logoutUser } from "../../services/authService.js";
  import { authLoadingStore } from "../../stores/loadingStore.js";
  import { toastError } from "../../util/toast.js";

  const {
    title,
    subtitle,
    logoLink = "/",
    profileLink = "/profile",
  } = $props();

  async function handleLogout(event) {
    event.preventDefault();
    try {
      await logoutUser();
      navigate("/");
    } catch (err) {
      toastError("Logout failed. Please try again.");
    }
  }
</script>

<header class="header">
  <div class="header__container">
    <div class="header__branding">
      <Link to={logoLink} class="header__logo">
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

    {#if !$authLoadingStore}
      {#if $userStore}
        <div class="header__user">
          <Link to={profileLink} class="header__user-pill ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              class="header__user-icon"
              ><path
                fill="#000000"
                d="M144 128a80 80 0 1 1 160 0 80 80 0 1 1 -160 0zm208 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0zM48 480c0-70.7 57.3-128 128-128l96 0c70.7 0 128 57.3 128 128l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8c0-97.2-78.8-176-176-176l-96 0C78.8 304 0 382.8 0 480l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8z"
              /></svg
            >
            <span class="header__username">{$userStore.username}</span>
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
    {/if}
  </div>
</header>

<style>
  @import "./header.css";
</style>
