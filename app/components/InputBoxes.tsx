'use client'

import React, { useEffect, useState } from "react";

const boxes = [
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

export const defaultBoxName = "input input-bordered input-info"

const InputBoxes = () => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, [])

    if (!hasMounted) {
        return null;
    }

    return (
        <div className="grid justify-center self-center gap-10 ">
            {   // map over the box data and create input boxes in column order
                boxes.map(({id, placeholder, units}) => {
                    return (
                            <div className="grid ">
                                <input id={id} type="text" placeholder={placeholder} 
                                    className={defaultBoxName} />

                                <span className="label-text grid justify-end">{units}</span>
                            </div>
                    )
                })
            }
        </div>
    );
};


export default InputBoxes