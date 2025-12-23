<script>
// @ts-nocheck

  import { Route, Router } from "svelte-routing";
  import Header from "./components/Header/Header.svelte";
  import { routes } from "./routes/routes.js";
  import { onMount } from "svelte";
  import { checkSession } from "./services/authService.js";
  import LoadingPage from "./pages/LoadingPage/LoadingPage.svelte";
  import { authLoadingStore } from "./stores/loadingStore.js";

  onMount(async () => {
    await checkSession();
  });
</script>

{#if $authLoadingStore}
  <LoadingPage />
{:else}
  <Router>
    <Header title="Nissemissionen" subtitle="Christmas Game Lobby" />
    {#each routes as { path, Component }}
      <Route {path} let:params>
        <Component {params} />
      </Route>
    {/each}
  </Router>
{/if}
