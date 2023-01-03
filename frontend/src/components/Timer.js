import React, { useEffect, useState } from "react";
import "../style/timer.css"

const Timer = ({value, setTimeInt, timeout}) => {
    useEffect(() => {
        const interval = setTimeout(() => setTimeInt(value - 1), 1000);
        if (value === -1) {
            timeout();
            clearTimeout(interval);
        }

        return () => clearTimeout(interval);
    }, [value]);
    return (
        <div class="base-timer">
            <span class="base-timer__label">
                { value !== -1 ? value : "--"}
            </span>
        </div>
    );
}

export default Timer;