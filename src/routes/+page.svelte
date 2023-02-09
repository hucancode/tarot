<script context="module">
  export const prerender = true;
</script>

<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import WavingHand from "$lib/components/waving-hand.svelte";
  import sets from "$lib/tarot/cards.json";
  import { _ } from "svelte-i18n";

  let setId = 0;
  let cardId = 0;
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
  <div
    transition:fade
    class="flex h-screen w-screen 
	items-center gap-7 bg-gray-100 text-black
	dark:bg-gray-800 dark:text-white"
  >
    <img class="max-h-full" src={`/cards/${setId}-${cardId}.jpg`} />
    <code>
      {JSON.stringify(sets[setId].cards[cardId])}
    </code>
  </div>
{/if}
