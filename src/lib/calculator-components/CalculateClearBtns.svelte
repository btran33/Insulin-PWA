<script lang="ts">
    import { defaultBoxClass } from './InputBoxes.svelte'
    import { supabase } from '../../supabaseClient';
    import type { AuthSession } from '@supabase/supabase-js';
    import { onMount } from 'svelte';
    import { resValue } from '../stores';

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
        let strength = parseFloat(getElement('strength').value)
        let volume = parseFloat(getElement('volume').value)

        let result = new Maybe(ttd, 'ttd')
                        .bind((ttd: number) => ttd * days, 'days')
                        .bind((days: number) => days / strength, 'strength')
                        .bind((strength: number) => strength / volume, 'volume')

        if (result.value) {
            let res = Math.ceil(result.value)
            resValue.set(res.toString())
            // insertTable(ttd, days, strength, volume, res)
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
            if (error) throw error
        }
    }

    const clear = () => {
        const allBoxesIDs = ['ttd', 'days', 'strength', 'volume']
        allBoxesIDs.map((id) => {
            getElement(id).value = ''
            getElement(id)?.setAttribute("class", defaultBoxClass)
        });
        resValue.set('')
    }
</script>

<div class="grid grid-flow-col justify-center gap-4 sticky bottom-0">
    <button class="btn btn-outline w-fit" on:click={clear}>Clear</button>
    <button class="btn btn-outline btn-success w-fit" on:click={calculate}>Calculate</button>
</div>