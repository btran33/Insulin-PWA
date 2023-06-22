'use client'

import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi"
import { useLocalStorage } from "usehooks-ts"

const SwitchThemeBtn = () => {
    const [hasMounted, setHasMounted] = useState(false);
    const [theme, setTheme] = useLocalStorage("theme", "light");

    // toggle effect
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    // modify data-theme on document's html when theme changes
    useEffect(() => {
        setHasMounted(true);
        const body = document.getElementsByTagName("html")[0];
        body.setAttribute("data-theme", theme);
    }, [theme])

    if (!hasMounted) {
        return null;
    }

    return (
        <div className="grid justify-end px-5">
            <button className="btn btn-circle" onClick={toggleTheme}>
                {
                    theme == "dark" ? (
                        <FiMoon className="w-5 h-5"/>
                    ) : (
                        <FiSun className="w-5 h-5"/>
                    )
                }
            </button>
        </div>
    );
};


export default SwitchThemeBtn;