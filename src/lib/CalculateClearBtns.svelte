<script lang="ts">
    import { defaultBoxClass } from './InputBoxes.svelte'
    import { defaultLabelName } from './ResultDisplay.svelte'

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
        let result = new Maybe(parseFloat(getElement('ttd').value), 'ttd')
                        .bind((ttd: number) => ttd * parseFloat(getElement('days').value), 'days')
                        .bind((days: number) => days / parseFloat(getElement('insulin-dispense').value), 'insulin-dispense')
        
        if (result.value) {
            getElement('result').textContent = Math.ceil(result.value).toString()
            getElement('result-label').setAttribute("class", defaultLabelName + "visible")
        }     
    }

    const clear = () => {
        const allBoxesIDs = ['ttd', 'days', 'insulin-dispense']
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