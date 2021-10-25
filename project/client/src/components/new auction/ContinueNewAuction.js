import React, { useEffect, useState } from 'react';
import { getAllUnapprovedAuctionsByUser } from '../../store/actions/newAuction';
import { ThemeContext } from '@emotion/react';
import { Link } from 'react-router-dom';

const ContinueNewAuction = () => {
    const [arr, setArr] = useState([]);//המכירות שלו שעדיין לא אושרו לתצוגה

    useEffect(() => {
        let userId = JSON.parse(localStorage.getItem("currentUser")).currentUser._id;
        getAllUnapprovedAuctionsByUser(userId).then(succ => {
            console.log(succ.data);
            setArr(succ.data);
        });

    }, []);
    let setArrInState = () => {

//   const [state, dispatch, writeError] = useStorageReducer(
//         localStorage,
//         'newAuction',//שם המשתנה בלוקל סטורג והוא יכיל את כל הסטייט
//         reducer,//רדיוסר
//         newAuctionState //מה הסטייט שיהיה בלוקל סטור' וזה גם הסטייט הכללי
//     );
    }
    return (
        <>
            <h1>Continue New Auction</h1>
            {arr.map(a => {
                <Link to={'newAuction'} onClick={() => setArrInState(a._id)}>{a.name}</Link>
            })}
        </>
    );
}

export default ContinueNewAuction;