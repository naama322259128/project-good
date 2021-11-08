import React, { useEffect, useState } from 'react';
import { getAllUnapprovedAuctionsByUserFromDB } from '../../store/actions/newAuction';
import { ThemeContext } from '@emotion/react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";


const ContinueNewAuction = (props) => {
    const [arr, setArr] = useState([]);//המכירות שלו שעדיין לא אושרו לתצוגה

    useEffect(() => {
        debugger;
        props.getAllUnapprovedAuctionsByUserFromDB(props.currentUser._id)
        // .then(succ => {
        //     console.log(succ.data);
        //     // setArr(succ.data);
        // });
    }, []);
    
    //TODO
    let setArrInState = () => {
    }
    return (
        <>
            <h1>Continue New Auction</h1>

            {/* {arr.map(a => {
                <Link to={'newAuction'} key={a._id} onClick={() => setArrInState(a._id)}>{a.name}</Link>
            })} */}
        </>
    );
}

//TODO לעשות כאן
const mapStateToProps = (state) => {
    return {
        currentUser:state.user.currentUser
    };
}
export default connect(mapStateToProps, { getAllUnapprovedAuctionsByUserFromDB })(ContinueNewAuction);
