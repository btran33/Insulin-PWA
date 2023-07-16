<script lang="ts">
    import InputBoxes from "./calculator-components/InputBoxes.svelte";
    import ResultDisplay from "./calculator-components/ResultDisplay.svelte";
    import CalculateClearBtns from "./calculator-components/CalculateClearBtns.svelte";

</script>

<main class="mx-auto mt-4 max-w-full">
    <div class="text-center text-3xl font-bold my-5 gap-4 "> Insulin Supply Calculator </div>
    
    <InputBoxes/>
  
    <ResultDisplay/>
  
    <CalculateClearBtns/>
  
</main>