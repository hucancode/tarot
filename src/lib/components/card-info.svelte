<script>
  import { fade } from "svelte/transition";
  import IconUp from "~icons/ph/caret-double-up-duotone";
  import IconDown from "~icons/ph/caret-double-down-duotone";
  export let card;
  export let revealed = false;
  export let upright = true;
  export let reverse = true;
</script>

<div class="prose flex w-full flex-col gap-4 dark:prose-invert md:w-1/2">
  <div
    class="flex grow flex-col items-center border border-gray-600 bg-gray-100 p-4 text-green-800 dark:bg-gray-800 dark:text-green-400"
  >
    <IconUp />
    <div class="flex h-full w-full grow items-center text-center">
      {#if revealed}
        <div transition:fade class:dim={!upright} class="h-max w-full">
          {card.meaning.upright.join(", ")}
        </div>
      {/if}
    </div>
  </div>
  <h3 class="m-0 px-2 py-4 text-center text-3xl font-bold uppercase">
    {#if revealed}
      <div transition:fade>
        {reverse && !upright ? "REVERSED " : ""}
        {card.name}
      </div>
      <div class="relative grid place-items-center">
        <input
          type="checkbox"
          id="liked"
          class="peer cursor-pointer appearance-none text-4xl text-gray-400 duration-200 before:content-['❤'] checked:text-red-500 active:scale-75"
        />
        <p
          class="absolute -bottom-full w-max text-xs font-light normal-case opacity-0 duration-200 peer-checked:opacity-100"
        >
          (this button does nothing 😉)
        </p>
        <label
          for="liked"
          class="absolute aspect-square origin-center rounded-full border-fuchsia-400 peer-checked:animate-bubble-expand"
        />
      </div>
    {:else}
      ???????????
    {/if}
  </h3>
  <div
    class="flex grow flex-col items-center border border-gray-600 bg-gray-100 p-4 text-blue-800 dark:bg-gray-800 dark:text-blue-400"
  >
    <div class="flex h-full w-full grow items-center text-center">
      {#if revealed}
        <div transition:fade class:dim={!reverse} class="h-max w-full">
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
