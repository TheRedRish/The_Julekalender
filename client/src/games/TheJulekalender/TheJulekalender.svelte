<script>
  import GameCanvas from "./components/GameCanvas.svelte";
  import GameHeader from "./components/GameHeader.svelte";
  import GameLayout from "./components/GameLayout.svelte";
  import CharacterSwitcher from "./components/CharacterSwitcher.svelte";

  let activeCharacter = "Fritz";

  const handleCharacterSelect = (name) => {
    activeCharacter = name;
  };
</script>

<GameLayout>
  {#snippet header()}
    <GameHeader />
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
