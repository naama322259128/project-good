import { minutesToMilliseconds } from 'date-fns';
import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
    //פה נכניס את הזמן שנותר עד לתאריך ביצוע ההגרלות
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600); // 10 minutes timer 

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning
    } = useTimer({ expiryTimestamp:time, onExpire: () => console.warn('onExpire called') });


    return (
        <div style={{ textAlign: 'center', fontSize: '100px', marginTop: '10vh' }}>
            <span>{days}</span>:
            <span>{String(hours).padStart(2, '0')}</span>:
            <span>{String(minutes).padStart(2, '0')}</span>:
            <span>{String(seconds).padStart(2, '0')}</span>
        </div>
    );
}

export default function App() {

    return (
        <div>
            <MyTimer />
        </div>
    );
}