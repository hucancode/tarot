<script>
  import { _ } from "svelte-i18n";
  import sets from "$lib/tarot/cards.json";
</script>

<svelte:head>
  <title>Umbala</title>
</svelte:head>

<div class="container my-4 grid grid-cols-2 gap-10 md:grid-cols-5">
  {#each sets as set}
    <div>
      <h2 class="border-b-4 text-xl font-bold">{set.name}</h2>
      <ul class="flex flex-col gap-2 text-lg font-semibold">
        {#each set.cards as card}
          <li class="text-blue-800 hover:text-blue-600">
            <a
              href={`${set.name.toLowerCase()}/${card.name
                .replaceAll(" ", "-")
                .toLowerCase()}`}
            >
              {card.name}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>
