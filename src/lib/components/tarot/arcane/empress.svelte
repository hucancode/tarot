<script>
  import { browser } from "$app/environment";
  import { onMount, onDestroy } from "svelte";
  import Canvas3D from "$lib/components/canvas-3d.svelte";
  import {
    CANVAS_ID,
    init,
    destroy,
    render,
  } from "$lib/three/canvas-3d";

  let canvas;

  onMount(async () => {
    await init();
    canvas.hideLoadingCircle();
  });

  onDestroy(() => {
    if (browser) {
      destroy();
    }
  });
</script>

<Canvas3D bind:this={canvas} id={CANVAS_ID} {render} />
