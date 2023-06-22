'use client'

import React, { useEffect, useState } from "react";
import { defaultBoxName } from "./InputBoxes";

const getElement = (id: string) => {
    return document.getElementById(id) as HTMLInputElement
}

/* A Monad to abstract the pipeline of applying calculation */
class Maybe {
    value: number;
    id: string;

    constructor (value: number, id: string) {
        this.value = value
        this.id = id

        //  change its box id to error box if NaN was given to initialize, otherwise keep it default
        !this.value ? getElement(this.id)?.setAttribute("class", "input input-bordered input-error") : 
                      getElement(this.id)?.setAttribute("class", defaultBoxName)
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

const Calculate_Clear_Btn = () => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, [])

    if (!hasMounted) {
        return null;
    }

    // calculation pipeline using bind
    const calculate = () => {
        let result = new Maybe(parseFloat(getElement('ttd').value), 'ttd')
                        .bind((ttd: number) => ttd * parseFloat(getElement('days').value), 'days')
                        .bind((days: number) => days / parseFloat(getElement('insulin-dispense').value), 'insulin-dispense')
        console.log(result)
    }

    // clear all boxes and results
    const clear = () => {
        // TODO: add id of result
        const allBoxesIDs = ['ttd', 'days', 'insulin-dispense']
        allBoxesIDs.map((id) => {
            getElement(id).value = ''
            getElement(id)?.setAttribute("class", defaultBoxName)
        });
    }

    return (
        <div className="grid grid-flow-col gap-4 fixed left-1/2 -translate-x-2/4 bottom-14">
            <button className="btn btn-outline" onClick={clear}>Clear</button>
            <button className="btn btn-outline btn-success" onClick={calculate}>Calculate</button>
        </div>
    );
};

export default Calculate_Clear_Btn;