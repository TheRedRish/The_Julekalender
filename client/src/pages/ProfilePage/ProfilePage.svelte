<script>
  import { requestPasswordReset } from "../../services/authService.js";
  import { userStore } from "../../stores/userStore.js";
  import { toastError, toastSuccess } from "../../util/toast.js";

  let isSending = $state(false);
  let status = $state({ type: "", message: "" });

  function setStatus(type, message) {
    status = { type, message };
  }

  async function handlePasswordReset() {
    if (!$userStore.email) {
      setStatus("error", "We could not find an email on your account.");
      return;
    }

    isSending = true;
    setStatus("", "");

    try {
      await requestPasswordReset($userStore.email);
      setStatus(
        "success",
        `A new password will be sent to ${$userStore.email}. Check your inbox.`
      );
      toastSuccess("Password reset email sent");
    } catch (err) {
      setStatus("error", err.message || "Could not send reset email.");
      toastError("Couldn't send reset email");
    } finally {
      isSending = false;
    }
  }
</script>

<section class="profile page">
  <div class="profile__container">
    <div class="profile__card profile__card--main">
      <header class="profile__header">
        <div>
          <p class="profile__eyebrow">Your profile</p>
          <h1 class="profile__title">Welcome back, {$userStore.username}</h1>
          <p class="profile__subtitle">
            Manage your account details and request a fresh password.
          </p>
        </div>
        <div class="profile__badge">ID: {$userStore.id}</div>
      </header>

      <div class="profile__info-grid">
        <div class="profile__info">
          <p class="profile__label">Username</p>
          <p class="profile__value">{$userStore.username}</p>
        </div>
        <div class="profile__info">
          <p class="profile__label">Email</p>
          <p class="profile__value profile__value--mono">
            {$userStore.email}
          </p>
        </div>
      </div>
    </div>

    <div class="profile__card profile__card--security">
      <div class="profile__security-header">
        <div>
          <p class="profile__eyebrow">Security</p>
          <h2 class="profile__section-title">Reset password</h2>
          <p class="profile__subtitle">
            We will generate a new password and email it to you instantly.
          </p>
        </div>
        <div class="profile__lock-icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 11H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2ZM9 11V7a3 3 0 1 1 6 0v4"
            />
          </svg>
        </div>
      </div>

      {#if status.message}
        <p class="profile__status profile__status--{status.type}">
          {status.message}
        </p>
      {/if}

      <button
        type="button"
        class="profile__reset-btn"
        onclick={handlePasswordReset}
        disabled={isSending}
      >
        {isSending ? "Sending..." : "Send reset email"}
      </button>
    </div>
  </div>
</section>

<style>
  @import "./profilePage.css";
</style>
