<script>
  import { Route, Router } from "svelte-routing";
  import Header from "./components/Header/Header.svelte";
  import { routes } from "./routes/routes.js";
  import { onMount } from "svelte";
  import { checkSession } from "./services/authService";

  onMount(async () => {
    await checkSession();
  });
</script>

<Router>
  <Header title="Nissemissionen" subtitle="Christmas Game Lobby" />
  {#each routes as { path, component }}
    <Route {path}>
      <svelte:component this={component} />
    </Route>
  {/each}
</Router>
