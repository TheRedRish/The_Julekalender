<script>
  import { navigate, Link } from "svelte-routing";
  import Button from "../../components/ui/Button.svelte";
  import { userStore } from "../../stores/userStore.js";

  const features = [
    {
      title: "Instant lobbies",
      description: "Spin up a game room in seconds and share a short link with friends.",
    },
    {
      title: "Privacy focused",
      description: "Lock lobbies with a password so only invited players can join.",
    },
    {
      title: "Built for teams",
      description: "Hand off leader role automatically and keep the room organized.",
    },
  ];

  const steps = [
    "Create or join a lobby from the list.",
    "Invite friends with the lobby link.",
    "Start the game when everyone is ready.",
  ];

  function handlePrimaryButton() {
    navigate($userStore ? "/lobbies" : "/login");
  }

  function handleSecondaryButton() {
    navigate($userStore ? "/profile" : "/register");
  }
</script>

<section class="frontpage page">
  <div class="frontpage__hero">
    <div class="frontpage__badge">Holiday edition</div>
    <h1 class="frontpage__title">Host, join, and manage your Christmas game lobbies.</h1>
    <p class="frontpage__subtitle">
      The Julekalender keeps your team together with easy lobby links, smooth handoffs, and quick
      starts.
    </p>

    <div class="frontpage__actions">
      <Button text={$userStore ? "Open lobbies" : "Login to play"} onClick={handlePrimaryButton} />
      <button class="frontpage__ghost" type="button" onclick={handleSecondaryButton}>
        {$userStore ? "View profile" : "Create an account"}
      </button>
    </div>

    <div class="frontpage__meta">
      <span>Fast setup</span>
      <span>Private links</span>
      <span>No installs</span>
    </div>
  </div>

  <div class="frontpage__content">
    <div class="frontpage__panel frontpage__panel--accent">
      <h2>Why players like it</h2>
      <div class="frontpage__features">
        {#each features as feature (feature.title)}
          <article class="frontpage__feature">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        {/each}
      </div>
    </div>

    <div class="frontpage__panel">
      <div class="frontpage__steps">
        <div>
          <p class="frontpage__eyebrow">How it works</p>
          <h2>Rally your lobby in three steps</h2>
          <ul>
            {#each steps as step (step)}
              <li>{step}</li>
            {/each}
          </ul>
          <div class="frontpage__cta-row">
            <Link to="/lobbies" class="frontpage__link">Browse lobbies</Link>
            <span class="frontpage__dot">•</span>
            <Link to="/register" class="frontpage__link">Create account</Link>
          </div>
        </div>
        <div class="frontpage__card">
          <div class="frontpage__card-body">
            <p class="frontpage__card-title">Ready to host?</p>
            <p class="frontpage__card-text">
              Create a lobby, share the link, and let the festivities begin.
            </p>
            <Button text="Create a lobby" onClick={() => navigate("/lobbies?create=true")} />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @import "./frontPage.css";
</style>
