<script context="module">
    let boxes = [
        {
            id: 'ttd',
            placeholder: 'Total Daily Dose',
            units: 'units per day'
        },
        {
            id: 'days',
            placeholder: 'Number of Days',
            units: '30, 60, etc.'
        },
        {
            id: 'insulin-dispense',
            placeholder: 'Insulin Dispensed',
            units: 'units/container'
        },
    ]
    export let defaultBoxClass = "input input-bordered input-info input-lg"
</script>

<div class="grid justify-center self-center gap-10 ">
    {#each boxes as box}
        <div class="grid">
            <input id={box.id} type="text" placeholder={box.placeholder} 
                class={defaultBoxClass} />
            <span class="label-text grid justify-end">{box.units}</span>
        </div>
    {/each}
</div>