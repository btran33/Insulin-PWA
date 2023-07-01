<script>
  import InputBoxes from './lib/InputBoxes.svelte';
  import CalculateClearBtns from './lib/CalculateClearBtns.svelte';
  import ResultDisplay from './lib/ResultDisplay.svelte';
  import MenuDrawer from './lib/MenuDrawer.svelte';
</script>

<main class="mx-auto mt-4 max-w-full">
  <MenuDrawer title="Insulin Supply Calculator"/>
  
  <InputBoxes/>

  <ResultDisplay/>

  <CalculateClearBtns/>

</main>

<style>
  /* .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  } */
</style>
