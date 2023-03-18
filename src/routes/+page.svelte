<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import sets from "$lib/tarot/cards.json";
  import Card from "$lib/components/card.svelte";
  import CardInfo from "$lib/components/card-info.svelte";

  let setId = 0;
  let cardId = 0;
  let revealed = false;
  let upright;
  $: card = sets[setId].cards[cardId];
  let pending = true;
  function draw() {
    setId = Math.floor(Math.random() * sets.length);
    cardId = Math.floor(Math.random() * sets[setId].cards.length);
    const card = sets[setId].cards[cardId];
    upright = Math.random() > 0.5;
    console.log(card);
    pending = false;
  }
</script>

<svelte:head>
  <title>Umbala</title>
</svelte:head>
{#if pending}
  <button on:click={draw}>Draw a card</button>
{:else}
  <div
    transition:fade
    class="container flex max-w-screen-md flex-col
	gap-4 overflow-hidden p-4 md:aspect-[1.5] md:flex-row"
  >
    <Card {card} {setId} {cardId} on:revealed={() => (revealed = true)} />
    <CardInfo {card} {revealed} {upright} reverse={!upright} />
  </div>
{/if}

<footer>
  <br />
  <a
    class="text-lg font-bold uppercase text-blue-600 hover:text-blue-500"
    href="/list">Card list</a
  >
</footer>
