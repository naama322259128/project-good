import React, { useEffect, useState } from 'react';
import { getUnapprovedAuctionsByUserFromDB } from '../../utils/auctionManagerUtils';
import { ThemeContext } from '@emotion/react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { setNewAuction } from '../../store/actions/newAuction'

const ContinueNewAuction = (props) => {
    const [auctionsList, setAuctionsList] = useState([]);//המכירות שלו שעדיין לא אושרו לתצוגה

    useEffect(() => {
        getUnapprovedAuctionsByUserFromDB(props.currentUser._id).then(succ => { setAuctionsList(succ.data)
      })
    }, []);

    return (
        <>
            <h1>Continue New Auction</h1>
            {auctionsList && auctionsList.map((a, index) => {
               return <><Link to={'/new_auction'} key={a._id} onClick={() => props.setNewAuction(auctionsList[index])}>{index+1+')  '}{a.name}</Link><br/></>
            })}
        </>
    );
}

//TODO לעשות כאן
const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, { setNewAuction })(ContinueNewAuction);
