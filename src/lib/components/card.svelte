<script>
  import { createEventDispatcher } from "svelte";
  import anime from "animejs";
  import { onMount } from "svelte";
  export let card;
  export let setId;
  export let cardId;
  export let revealed = false;

  const CARD_BACK = "/cards/0.webp";
  $: cardFront = `/cards/${setId}-${cardId}.webp`;
  let cardArt;
  let revealAnimation;
  const dispatch = createEventDispatcher();

  function playAnimation() {
    cardArt.style = "transform: scaleX(0);";
    revealAnimation.play();
  }

  onMount(() => {
    if (revealed) {
      cardArt.src = cardFront;
      return;
    }
    cardArt.src = CARD_BACK;
    cardArt.value = 0;
    revealAnimation = anime({
      targets: cardArt,
      value: 15,
      duration: 4000,
      easing: "easeInOutCubic",
      autoplay: false,
      update: function (anim) {
        const turn = Math.floor(cardArt.value);
        let scale = cardArt.value % 1.0;
        if (turn % 2 == 1) {
          scale = 1 - scale;
        }
        if (Math.floor(turn / 2) % 2 == 1) {
          cardArt.src = cardFront;
        } else {
          cardArt.src = CARD_BACK;
        }
        cardArt.style = `transform: scaleX(${scale});`;
      },
      complete: function (anim) {
        revealed = true;
        dispatch("revealed");
      },
    });
  });
</script>

<svelte:head>
  <link rel="prefetch" href={cardFront} />
</svelte:head>

<button
  disabled={revealed}
  on:click={playAnimation}
  class="flex aspect-[2.5/3.5] w-full flex-col items-center gap-2 md:w-1/2"
>
  <img alt={card.name} class="h-full w-full object-fill" bind:this={cardArt} />
</button>
