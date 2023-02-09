<script context="module">
  export const prerender = true;
</script>

<script>
  import WavingHand from "$lib/components/waving-hand.svelte";
  import sets from "$lib/tarot/cards.json";
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";

  let setId = 0;
  let cardId = 0;
  onMount(() => {
    setId = Math.floor(Math.random() * sets.length);
    cardId = Math.floor(Math.random() * sets[setId].cards.length);
    const card = sets[setId].cards[cardId];
    console.log(card);
  });
</script>

<svelte:head>
  <title>SvelteKit</title>
</svelte:head>
<div
  class="flex h-screen w-screen 
	items-center gap-7 bg-gray-100 text-black
	dark:bg-gray-800 dark:text-white"
>
  <img class="max-h-full" src={`/cards/${setId}-${cardId}.jpg`} />
  <code>
    {JSON.stringify(sets[setId].cards[cardId])}
  </code>
</div>
