<script>
  import GameCanvas from "./components/GameCanvas.svelte";
  import GameHeader from "./components/GameHeader.svelte";
  import GameLayout from "./components/GameLayout.svelte";
  import CharacterSwitcher from "./components/CharacterSwitcher.svelte";

  // Route params (if present) can surface contextual data like lobby ID.
  const { params = {} } = $props();
  const lobbyId = $derived(params.id);

  let activeCharacter = "Fritz";

  const status = {
    phase: "Waiting in lobby",
    goal: "Get ready for the next round"
  };

  const handleCharacterSelect = (name) => {
    activeCharacter = name;
  };
</script>

<GameLayout>
  {#snippet header()}
    <GameHeader phase={status.phase} goal={status.goal} />
  {/snippet}

  {#snippet canvas()}
    <GameCanvas />
  {/snippet}

  {#snippet footer()}
    <CharacterSwitcher
      active={activeCharacter}
      onSelect={handleCharacterSelect}
    />
  {/snippet}
</GameLayout>
