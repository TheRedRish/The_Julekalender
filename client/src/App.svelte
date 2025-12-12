<script>
  import { Route, Router, Link } from "svelte-routing";
  import Header from "./components/Header/Header.svelte";
  import { routes } from "./routes/routes.js";
  import LobbyOverview from "./pages/LobbyOverview/LobbyOverview.svelte";
</script>

<Router>
  <Header
    title="Nissemissionen"
    subtitle="Christmas Game Lobby"
  />
    {#each routes as { path, component }}
    <Route path={path}>
      <svelte:component this={component} />
    </Route>
  {/each}
</Router>
