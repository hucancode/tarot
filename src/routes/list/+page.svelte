<script>
  import { _ } from "svelte-i18n";
  import sets from "$lib/tarot/cards.json";
</script>

<svelte:head>
  <title>Umbala</title>
</svelte:head>

<div class="flex gap-4">
  {#each sets as set}
    <div>
      <h2 class="text-xl font-bold">{set.name}</h2>
      <ul>
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
