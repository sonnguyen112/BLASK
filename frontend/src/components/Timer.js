import React, { useEffect, useState } from "react";
import "../style/timer.css"

const Timer = ({value, setTimeInt, timeout}) => {
    useEffect(() => {
        const interval = setInterval(() => setTimeInt(value - 1), 1000);
        console.log(value)
        if (value === -1) {
            timeout();
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [value]);
    return (
        <div class="base-timer">
            <span class="base-timer__label">
                { value }
            </span>
        </div>
    );
}

export default Timer;