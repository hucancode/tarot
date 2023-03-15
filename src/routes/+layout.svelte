<script>
  import "$lib/styles/app.css";
</script>

<nav>
  <a
    class="text-lg font-bold uppercase text-blue-600 hover:text-blue-500"
    href="/list">Card list</a
  >
  <a
    class="text-lg font-bold uppercase text-blue-600 hover:text-blue-500"
    href="/">Home</a
  >
</nav>
<main>
  <slot />
</main>

<footer>Made with 💖 by hucancode</footer>
