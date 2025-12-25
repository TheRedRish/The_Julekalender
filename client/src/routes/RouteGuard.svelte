<script>
  import { navigate } from "svelte-routing";
  import PleaseLoginContent from "../components/PleaseLoginContent/PleaseLoginContent.svelte";
  import { userStore } from "../stores/userStore.js";

  const {
    component: Component,
    params,
    requiresAuth = false,
    redirectTo = "/login",
  } = $props();

  const isAuthed = $derived(!!$userStore);

  // Redirect when a protected route is visited without auth
  $effect(() => {
    if (requiresAuth && !isAuthed) {
      navigate(redirectTo);
    }
  });
</script>

{#if !requiresAuth || isAuthed}
  <Component {params} />
{:else}
  <section class="route-guard page">
    <div class="route-guard__card">
      <PleaseLoginContent loginPath={redirectTo} />
    </div>
  </section>
{/if}

<style>
  .route-guard {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px 20px;
  }

  .route-guard__card {
    background: #ffffff;
    border: 1px solid #e1e1e1;
    border-radius: 14px;
    padding: 22px;
    box-shadow: var(--shadow-xs);
    width: min(560px, 100%);
  }
</style>
