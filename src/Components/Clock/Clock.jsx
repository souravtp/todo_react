import React from 'react'
import { useState, useEffect } from 'react';
import './Clock.css'

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = time.toLocaleTimeString();

    return (
        <div className='time-container'>
            <h1 className='time-text'>{formattedTime}</h1>
        </div>
    )
}

export default Clock