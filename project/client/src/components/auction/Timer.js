import { minutesToMilliseconds } from 'date-fns';
import { useTimer } from 'react-timer-hook';
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { dataUpdate } from '../../store/actions/user';

function MyTimer(props) {
    //useEffect(() => { props.dataUpdate(); })
    //פה נכניס את הזמן שנותר עד לתאריך ביצוע ההגרלות
    const time = props.currentAuction && new Date(props.currentAuction.registrationEndDate) || new Date('2021-12-20T03:24:00');
    // time.setSeconds(time.getSeconds()); // 10 minutes timer 

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning
    } = useTimer({ expiryTimestamp: time, onExpire: () => console.warn('onExpire called') });

    return (
        <div style={{
            fontSize: '3vh', top: '2.6vh', zIndex: 8888, marginLeft: '2vw'
        }}>
            <span>{days}</span>:
            <span>{String(hours).padStart(2, '0')}</span>:
            <span>{String(minutes).padStart(2, '0')}</span>:
            <span>{String(seconds).padStart(2, '0')}</span>
        </div >
    );
}
const mapStateToProps = state => {
    return {
        currentAuction: state.currentAuction.currentAuction,
    }
}
export default connect(mapStateToProps, {dataUpdate})(MyTimer);
