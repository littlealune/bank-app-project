import React, { useState, useEffect } from 'react';
import './LogOutTimer.css'

function LogOutTimer() {
    const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
    const [clase, setClase] = useState([])

    useEffect(() => {

        setClase(timeRemaining <= 30 ? 'text-danger' : '');

        const intervalId = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(intervalId); // Stop the countdown when it reaches 0
                    // You can perform any action here when the countdown reaches 0
                    window.location.reload();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000); // Update the timer every second

        return () => {
            clearInterval(intervalId); // Cleanup the interval when the component unmounts
        };
    }, [timeRemaining]); // Empty dependency array ensures that the effect runs only once on component mount

    // Convert seconds to minutes and seconds for display
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <div>
            <p>
                Time Remaining: <span id="timer" class={clase}>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </p>
        </div>
    );
}

export default LogOutTimer;