import { connect } from "react-redux";
import OneAuction from './OneAuction';
import { Link } from 'react-router-dom';
import './home.scss';
import { getAuctionsListFromDB} from "../../utils/auctionUtils";
import { setLogin } from '../../store/actions/home';
import { getAuctionFromDB } from '../../store/actions/currentAuction'
import React, { useEffect, useState } from "react";


const AuctionsList = (props) => {
    let [auctionsList, setAuctionsList] = useState([]);
    //הכנסת רשימה של כל המכירות הקיימות במסד נתונים
    useEffect(() => {
        getAuctionsListFromDB().then(succ => { setAuctionsList(succ.data) })
    }, []);

    return (<>
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
    </>
    );
}


const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}
export default connect(mapStateToProps, { setLogin, getAuctionFromDB })(AuctionsList);


