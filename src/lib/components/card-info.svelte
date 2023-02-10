<script>
  import { fade } from "svelte/transition";
  import IconUp from "~icons/ph/caret-double-up-duotone";
  import IconDown from "~icons/ph/caret-double-down-duotone";
  export let card;
  export let revealed = true;
  export let upright = true;
  export let reverse = true;
</script>

<div class="prose flex w-full flex-col gap-4 dark:prose-invert md:w-1/2">
  <div
    class="flex grow flex-col items-center border border-gray-600 bg-gray-100 p-4 text-green-800 dark:bg-gray-800 dark:text-green-400"
  >
    <IconUp />
    <div class="flex items-center h-full w-full grow text-center">
      {#if revealed || true}
        <div transition:fade class:dim={!upright} class="w-full h-max">
          {card.meaning.upright.join(", ")}
        </div>
      {/if}
    </div>
  </div>
  <h3 class="m-0 px-2 py-4 text-center text-3xl font-bold uppercase">
    {#if revealed || true}
      <div transition:fade>
        {card.name}
        {upright && !reverse
          ? " (UPRIGHT)"
          : reverse && !upright
          ? " (REVERSED)"
          : ""}
      </div>
    {:else}
      ???????????
    {/if}
  </h3>
  <div
    class="flex grow flex-col items-center border border-gray-600 bg-gray-100 p-4 text-blue-800 dark:bg-gray-800 dark:text-blue-400"
  >
    <div class="flex items-center h-full w-full grow text-center">
      {#if revealed || true}
        <div transition:fade class:dim={!reverse} class="w-full h-max">
          {card.meaning.reverse.join(", ")}
        </div>
      {/if}
    </div>
    <IconDown />
  </div>
</div>

<style>
  .dim {
    @apply opacity-10;
  }
</style>
