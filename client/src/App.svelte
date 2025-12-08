<script>
  import { Route, Router } from "svelte-routing";
  import LoginForm from "./lib/components/LoginForm/LoginForm.svelte";
</script>

<Router>
  <Route path="/login">
    <LoginForm />
  </Route>
</Router>
