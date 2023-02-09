<script>
  import { _ } from "svelte-i18n";
  export let data;
</script>

<svelte:head>
  <title>{data.name}</title>
</svelte:head>

<div
  class="container flex max-w-screen-md flex-col items-center 
gap-4 overflow-hidden md:flex-row"
>
  <div class="aspect-[2.5/3.5]">
    <img
      alt={data.name}
      class="max-h-full w-auto object-contain"
      src={`/cards/${data.setId}-${data.cardId}.webp`}
    />
  </div>
  <div class="prose flex w-full flex-col gap-4 md:h-full">
    <div
      class="flex grow flex-col items-center rounded-xl border border-green-600 bg-green-200 p-4 text-blue-700 before:text-4xl before:content-['⯅']"
    >
      <div
        class="flex h-full w-full grow flex-wrap items-center justify-center gap-2"
      >
        {#each data.meaning.upright as text}
          <span>{text}</span>
        {/each}
      </div>
    </div>
    <h3 class="text-center text-3xl font-bold uppercase">{data.name}</h3>
    <div
      class="flex grow flex-col items-center rounded-xl border border-green-600 bg-green-200 p-4 text-gray-700 after:text-4xl after:content-['⯆']"
    >
      <div
        class="flex h-full w-full grow flex-wrap items-center justify-center gap-2"
      >
        {#each data.meaning.reverse as text}
          <span>{text}</span>
        {/each}
      </div>
    </div>
  </div>
</div>
