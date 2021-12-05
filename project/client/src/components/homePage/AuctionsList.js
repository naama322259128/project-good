import { connect } from "react-redux";
import OneAuction from './OneAuction';
import { Link } from 'react-router-dom';
import './home.scss';
import { getpublicationApprovalAuctionsListFromDB} from "../../utils/auctionUtils";
import { setLogin } from '../../store/actions/home';
import { getAuctionFromDB } from '../../store/actions/currentAuction'
import React, { useEffect, useState } from "react";


const AuctionsList = (props) => {
    let [auctionsList, setAuctionsList] = useState([]);
    //הכנסת רשימה של כל המכירות הקיימות במסד נתונים
    useEffect(() => {
        getpublicationApprovalAuctionsListFromDB().then(succ => {console.log(succ.data); setAuctionsList(succ.data) })
    },[] );

    return (<div id="auctions-container">
        {auctionsList && auctionsList.map((item) => {
            return (
                <Link
                    key={parseInt(item._id)}
                    onClick={props.currentUser ? () => props.getAuctionFromDB(item._id) : () => { props.setLogin(true); window.scrollTo(0, 0); }}
                    to={props.currentUser ? `/auction` : '#'}>
                    <OneAuction key={parseInt(item._id)} item={item} />
                </Link>
            )
        })}
    </div>
    );
}


const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}
export default connect(mapStateToProps, { setLogin, getAuctionFromDB })(AuctionsList);


