<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import sets from "$lib/tarot/cards.json";
  import Card from "$lib/components/card.svelte";
  import CardInfo from "$lib/components/card-info.svelte";

  let setId = 0;
  let cardId = 0;
  $: card = sets[setId].cards[cardId];
  let loading = true;
  onMount(() => {
    setId = Math.floor(Math.random() * sets.length);
    cardId = Math.floor(Math.random() * sets[setId].cards.length);
    const card = sets[setId].cards[cardId];
    console.log(card);
    loading = false;
  });
</script>

<svelte:head>
  <title>Umbala</title>
</svelte:head>

{#if !loading}
  <main
    transition:fade
    class="container flex max-w-screen-md flex-col items-stretch
	gap-4 overflow-hidden p-4 md:flex-row"
  >
    <Card {card} {setId} {cardId} />
    <CardInfo {card} />
  </main>
{/if}

<footer>
  <br />
  <a
    class="text-lg font-bold uppercase text-blue-600 hover:text-blue-500"
    href="/list">Card list</a
  >
</footer>
