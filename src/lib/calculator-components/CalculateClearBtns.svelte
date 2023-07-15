<script lang="ts">
    import { defaultBoxClass } from './InputBoxes.svelte'
    import { defaultLabelName } from './ResultDisplay.svelte'
    import { supabase } from '../../supabaseClient';
    import type { AuthSession } from '@supabase/supabase-js';
    import { onMount } from 'svelte';

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
            getElement(this.id)?.setAttribute("class", defaultBoxClass + (!this.value ? ' input-error' : ''))
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
    const calculate = () => {
        let ttd = parseFloat(getElement('ttd').value); 
        let days = parseFloat(getElement('days').value)
        let strength = parseFloat(getElement('insulin-strength').value)
        let volume = parseFloat(getElement('insulin-dispense').value)

        let result = new Maybe(ttd, 'ttd')
                        .bind((ttd: number) => ttd * days, 'days')
                        .bind((days: number) => days / strength, 'insulin-strength')
                        .bind((strength: number) => strength / volume, 'insulin-dispense')

        if (result.value) {
            let res = Math.ceil(result.value)
            getElement('result').textContent = res.toString()
            getElement('result-label').setAttribute("class", defaultLabelName + "visible")
            // insertTable(ttd, days, strength, volume, res)
        }
    }

    // const insertTable = async (ttd: number, days: number, strength: number, volume: number, result: number) => {
    //     if (session) {
    //         const { data, error } = await supabase
    //             .from('calculations')
    //             .insert([{
    //                 ttd: ttd,
    //                 days: days,
    //                 strength: strength,
    //                 volume: volume,
    //                 result: result
    //             }])
    //             .select()
    //         if (error) throw error
    //     }
    // }

    const clear = () => {
        const allBoxesIDs = ['ttd', 'days', 'insulin-strength', 'insulin-dispense']
        allBoxesIDs.map((id) => {
            getElement(id).value = ''
            getElement(id)?.setAttribute("class", defaultBoxClass)
        });
        getElement('result').textContent = ''
        getElement('result-label').setAttribute("class", defaultLabelName + "invisible")
    }
</script>

<div class="grid grid-flow-col justify-center gap-4 sticky bottom-0">
    <button class="btn btn-outline w-fit" on:click={clear}>Clear</button>
    <button class="btn btn-outline btn-success w-fit" on:click={calculate}>Calculate</button>
</div>