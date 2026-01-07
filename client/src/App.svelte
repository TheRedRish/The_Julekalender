<script>
  import { Route, Router } from "svelte-routing";
  import Header from "./components/Header/Header.svelte";
  import { routes } from "./routes/routes.js";
  import { onMount } from "svelte";
  import { checkSession } from "./services/authService.js";
  import RouteGuard from "./routes/RouteGuard.svelte";
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
    <Header />
    {#each routes as route}
      <Route path={route.path} let:params>
        <RouteGuard
          component={route.Component}
          params={params}
          requiresAuth={route.requiresAuth}
          requiresLobbyMember={route.requiresLobbyMember}
        />
      </Route>
    {/each}
  </Router>
{/if}
