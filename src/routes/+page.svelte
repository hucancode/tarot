<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import sets from "$lib/tarot/cards.json";

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
    class="container flex max-w-screen-md flex-col items-center 
	gap-4 overflow-hidden md:flex-row"
  >
    <div class="flex aspect-[2.5/3.5] flex-col items-center gap-2">
      <img
        alt={card.name}
        class="max-h-full w-auto object-contain"
        src={`/cards/${setId}-${cardId}.webp`}
      />
      <a
        class="uppercase text-blue-600 hover:text-blue-500"
        href={`/${sets[setId].name.toLowerCase()}/${card.name
          .replaceAll(" ", "-")
          .toLowerCase()}`}
      >
        Link to this card
      </a>
    </div>
    <div class="prose flex w-full flex-col gap-4 dark:prose-invert md:h-full">
      <div
        class="flex grow flex-col items-center rounded-xl border border-green-600 bg-green-200 p-4 text-blue-700 before:text-4xl before:content-['⯅']"
      >
        <div
          class="flex h-full w-full grow flex-wrap items-center justify-center gap-2"
        >
          {#each card.meaning.upright as text}
            <span>{text}</span>
          {/each}
        </div>
      </div>
      <h3 class="text-center text-3xl font-bold uppercase">{card.name}</h3>
      <div
        class="flex grow flex-col items-center rounded-xl border border-green-600 bg-green-200 p-4 text-gray-700 after:text-4xl after:content-['⯆']"
      >
        <div
          class="flex h-full w-full grow flex-wrap items-center justify-center gap-2"
        >
          {#each card.meaning.reverse as text}
            <span>{text}</span>
          {/each}
        </div>
      </div>
    </div>
  </main>
{/if}

<footer>
  <br />
  <a
    class="text-lg font-bold uppercase text-blue-600 hover:text-blue-500"
    href="/list">Card list</a
  >
</footer>
