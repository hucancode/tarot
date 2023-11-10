<script>
  import Card from "$lib/components/card.svelte";
  import CardInfo from "$lib/components/card-info.svelte";

  export let data;
</script>

<svelte:head>
  <title>{data.name}</title>
</svelte:head>

<main
  class="container flex max-w-screen-md flex-col items-stretch gap-4
overflow-hidden p-4 md:flex-row"
>
  <Card card={data} setId={data.setId} cardId={data.cardId} revealed={true} />
  <CardInfo card={data} revealed={true} />
</main>

<footer>
  <a
    class="text-lg font-bold uppercase text-blue-600 hover:text-blue-500"
    href="/list">Card list</a
  >
</footer>
