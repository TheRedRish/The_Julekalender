<script>
  import { Route, Router, Link } from "svelte-routing";
  import LoginForm from "./components/LoginForm/LoginForm.svelte";
  import RegisterForm from "./components/RegisterForm/RegisterForm.svelte";
  import ForgotPasswordForm from "./components/ForgotPasswordForm/ForgotPasswordForm.svelte";
  import Header from "./components/Header/Header.svelte";


</script>

<Router>
  <Header
    title="The Julekalender"
    subtitle="The Christmas Calendar"
    username="Username"
  />
  <div>
    <Route path="/login">
      <LoginForm />
    </Route>
    <Route path="/register">
      <RegisterForm />
    </Route>
    <Route path="/forgot-password">
      <ForgotPasswordForm />
    </Route>
  </div>
</Router>
