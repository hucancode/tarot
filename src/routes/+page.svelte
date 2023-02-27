<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import sets from "$lib/tarot/cards.json";
  import { addDrawSession } from "$lib/firebase/store";
  import Card from "$lib/components/card.svelte";
  import CardInfo from "$lib/components/card-info.svelte";
  import SignIn from "$lib/components/signin-button.svelte";

  let setId = 0;
  let cardId = 0;
  let revealed = false;
  let upright;
  $: card = sets[setId].cards[cardId];
  let pending = true;
  function draw() {
    addDrawSession(
      [
        {
          set: setId,
          card: cardId,
          upright: upright,
        },
      ],
      4
    );
    pending = false;
  }
  onMount(() => {
    setId = Math.floor(Math.random() * sets.length);
    cardId = Math.floor(Math.random() * sets[setId].cards.length);
    upright = Math.random() > 0.5;
  });
</script>

<svelte:head>
  <title>Umbala</title>
</svelte:head>

{#if pending}
  <button on:click={draw}>Draw a card</button>
{:else}
  <div    transition:fade
    class="container flex max-w-screen-md flex-col
	gap-4 overflow-hidden p-4 md:aspect-[1.5] md:flex-row"
  >
    <Card {card} {setId} {cardId} on:revealed={() => (revealed = true)} />
    <CardInfo {card} {revealed} {upright} reverse={!upright} />
  </div>
{/if}
