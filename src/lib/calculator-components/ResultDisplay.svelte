<script >
    import { resValue } from "../stores";
    const defaultLabelName = "grid grid-flow-col justify-center text-2xl"
</script>



<div id="result-container" class="h-48 translate-y-1/4">
    <div id="result" class="grid grid-flow-col justify-center text-5xl font-bold my-5 gap-4 top-5">{$resValue}</div>
    <div id="result-label" class={defaultLabelName }>{$resValue? 'containers' : ''}</div>
</div>