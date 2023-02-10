<script>
  import IconUp from "~icons/ph/caret-double-up-duotone";
  import IconDown from "~icons/ph/caret-double-down-duotone";
  export let card;
</script>

<div class="prose flex w-full flex-col gap-4 dark:prose-invert">
  <div
    class="flex grow flex-col items-center border border-green-600 bg-green-200 p-4 text-blue-700"
  >
    <IconUp />
    <div class="grid h-full w-full grow place-items-center text-center">
      {card.meaning.upright.join(", ")}
    </div>
  </div>
  <h3 class="m-0 px-2 py-4 text-center text-3xl font-bold uppercase">
    {card.name}
  </h3>
  <div
    class="flex grow flex-col items-center border border-green-600 bg-green-200 p-4 text-gray-700"
  >
    <div class="grid h-full w-full grow place-items-center text-center">
      {card.meaning.reverse.join(", ")}
    </div>
    <IconDown />
  </div>
</div>
