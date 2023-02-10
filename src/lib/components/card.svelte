<script>
  import anime from "animejs";
  import { onMount } from "svelte";
  export let card;
  export let setId;
  export let cardId;
  export let revealed = false;

  let cardArt;
  onMount(() => {
    cardArt.scaleX = 0;
    anime({
      targets: cardArt,
      scaleX: 1,
      duration: 2000,
    });
  });
</script>

<div class="flex aspect-[2.5/3.5] flex-col items-center gap-2">
  <img
    alt={card.name}
    bind:this={cardArt}
    class="h-full w-full object-fill"
    src={`/cards/${setId}-${cardId}.webp`}
  />
</div>
