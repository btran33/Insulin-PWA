<script >
    import { ttd, days, strength, volume, defaultBoxClass } from "../stores";
</script>

<div class="grid justify-center self-center gap-10 ">
    <div class="grid">
        <input id='ttd' type="text" placeholder='Total Daily Dose'
            class={defaultBoxClass} 
            bind:value={ $ttd}/>
        <span class="label-text grid justify-end">units/day</span>
    </div>
    <div class="grid">
        <input id='days' type="text" placeholder='Number of Days'
            class={defaultBoxClass} 
            bind:value={ $days}/>
        <span class="label-text grid justify-end">30, 60, etc.</span>
    </div>
    <div class="grid">
        <input id='strength' type="text" placeholder='Insulin Strength'
            class={defaultBoxClass} 
            bind:value={ $strength}/>
        <span class="label-text grid justify-end">u-100, 200, etc.</span>
    </div>
    <div class="grid">
        <input id='volume' type="text" placeholder='Insulin Amount'
            class={defaultBoxClass} 
            bind:value={ $volume}/>
        <span class="label-text grid justify-end">mL/container</span>
    </div>
</div>