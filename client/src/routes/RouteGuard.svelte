<script>
  import { navigate } from "svelte-routing";
  import PleaseLoginContent from "../components/PleaseLoginContent/PleaseLoginContent.svelte";
  import { userStore } from "../stores/userStore.js";
  import Modal from "../components/ui/Modal/Modal.svelte";

  const {
    component: Component,
    params,
    requiresAuth = false,
    redirectTo = "/login",
  } = $props();

  const isAuthed = $derived(!!$userStore);
</script>

{#if !requiresAuth || isAuthed}
  <Component {params} />
{:else}
  <Modal open={true} onClose={null} closable={false}>
      <PleaseLoginContent loginPath={redirectTo} />
  </Modal>
{/if}
