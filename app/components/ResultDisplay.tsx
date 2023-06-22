'use client'

import React, { useEffect, useState } from "react";

export const defaultLabelName = "grid grid-flow-col justify-center text-2xl "

const ResultDisplay = () => {
    const [hasMounted, setHasMounted] = useState(false);

    
    useEffect(() => {
        setHasMounted(true);
    }, [])

    if (!hasMounted) {
        return null;
    }

    return (
        <div id="result-container" className="h-48 translate-y-1/4">
            <div id="result" className="grid grid-flow-col justify-center text-5xl font-bold my-5 gap-4 top-5"></div>
            <div id="result-label" className={defaultLabelName + "invisible"}>containers</div>
        </div>
    );
};


export default ResultDisplay;