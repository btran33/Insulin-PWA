<script lang="ts">
    import { supabase } from '../../supabaseClient';
    import type { AuthSession } from '@supabase/supabase-js';
    import { onMount } from 'svelte';
    import { ttd, days, strength, volume, resValue, defaultBoxClass, isSaving, historyFocus } from "../stores";
    import { get } from 'svelte/store';

    let session: AuthSession

    onMount(() => {
        supabase.auth.getSession().then(({ data }) => {
            session = data.session
        })

        supabase.auth.onAuthStateChange((_event, _session) => {
            session = _session
        })
    })

    const getElement = (id: string) => {
        return document.getElementById(id) as HTMLInputElement
    }
    
    /**
        An monadic abstraction for pipelining the  
        calculation's error checking in each box
    */
    class Maybe {
        value: number;
        id: string;

        constructor (value: number, id: string) {
            this.value = value
            this.id = id

            //  change its box id to error box if NaN was given to initialize, otherwise keep it default
            getElement(this.id)?.setAttribute("class", 
                defaultBoxClass + (!this.value ? ' input-error' : '')
            )
        }

        // bind the function to the current Maybe's inner value and return a new instance of Maybe
        bind(func: Function, id: string) {
            if (!this.value) {
                return this
            }
            let value = func(this.value)
            return new Maybe(value, id)
        }
    }

    // calculation pipeline using bind and display value if successful
    const calculate = async () => {
        let ttd_ = parseFloat($ttd)
        let days_ = parseFloat($days)
        let strength_ = parseFloat($strength)
        let volume_ = parseFloat($volume)

        let result = new Maybe(ttd_, 'ttd')
                        .bind((ttd: number) => ttd * days_, 'days')
                        .bind((days: number) => days / strength_, 'strength')
                        .bind((strength: number) => strength / volume_, 'volume')

        if (result.value) {
            let res = Math.ceil(result.value)
            resValue.set(res.toString())

            if (session && get(isSaving)) {
                insertTable(ttd_, days_, strength_, volume_, res)
            }
        }
    }

    const insertTable = async (ttd: number, days: number, strength: number, volume: number, result: number) => {
        if (session) {
            const { user } = session
            const { data, error } = await supabase
                .from('calculations')
                .insert({
                    user_id: user.id,
                    created_at: new Date().toISOString(),
                    ttd: ttd,
                    days: days,
                    strength: strength,
                    volume: volume,
                    result: result,
                })
                
            if (error) {
                alert('No more than 20 saved calculations can be made. Please delete some before saving again.')
                return
            }
            $historyFocus.id = 0
        }
    }

    const clear = () => {
        const inputs = [
            {'ttd': ttd}, 
            {'days': days}, 
            {'strength': strength}, 
            {'volume': volume}, 
        ]
        for(const input of inputs) {
            Object.values(input)[0].set('')
            getElement(Object.keys(input)[0]).setAttribute('class', defaultBoxClass)
        }
        resValue.set('')
        $historyFocus.id = -1
    }
</script>

<div class="grid grid-flow-col justify-center gap-4 sticky bottom-0">
    <button class="btn btn-outline w-fit" on:click={clear}>Clear</button>
    <div>
        <button class="btn btn-outline btn-success w-fit" on:click={calculate}>Calculate</button>
        {#if $isSaving && session}
            <span class="label-text grid justify-center">and Save</span> 
        {/if}
    </div>
</div>

<style>

</style>