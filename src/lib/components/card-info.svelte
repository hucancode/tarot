<script>
  import { fade } from "svelte/transition";
  import IconUp from "~icons/ph/caret-double-up-duotone";
  import IconDown from "~icons/ph/caret-double-down-duotone";
  export let card;
  export let revealed = false;
</script>

<div class="prose flex w-full flex-col gap-4 dark:prose-invert md:w-1/2">
  <div
    class="flex grow flex-col items-center border border-gray-600 bg-gray-100 p-4 text-green-800 dark:bg-gray-800 dark:text-green-400"
  >
    <IconUp />
    <div class="grid h-full w-full grow place-items-center text-center">
      {#if revealed}
        <div transition:fade>
          {card.meaning.upright.join(", ")}
        </div>
      {/if}
    </div>
  </div>
  <h3 class="m-0 px-2 py-4 text-center text-3xl font-bold uppercase">
    {#if revealed}
      <div transition:fade>
        {card.name}
      </div>
    {:else}
      ???????????
    {/if}
  </h3>
  <div
    class="flex grow flex-col items-center border border-gray-600 bg-gray-100 p-4 text-blue-800 dark:bg-gray-800 dark:text-blue-400"
  >
    <div class="grid h-full w-full grow place-items-center text-center">
      {#if revealed}
        <div transition:fade>
          {card.meaning.reverse.join(", ")}
        </div>
      {/if}
    </div>
    <IconDown />
  </div>
</div>
