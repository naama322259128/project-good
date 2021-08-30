import { connect } from "react-redux";
import OneAuction from './OneAuction';
import { setCurrentAuction } from '../../store/actions/currentAuction'
import { Link } from 'react-router-dom';
import './home.scss';
import { setLogin } from "../../store/actions/home";
import { getAuctionsList } from "../../utils/auctionUtils";
import React, { useEffect, useState } from "react";
import { updateCurrentUser } from '../../store/actions/user'

const AuctionsList = (props) => {
    let [auctionsList, setAuctionsList] = useState([]);

    //הכנסת רשימה של כל המכירות הקיימות במסד נתונים
    useEffect(() => {
        props.updateCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
        getAuctionsList().then(succ => { setAuctionsList(succ.data) })
    }, []);


    return (<>
        {auctionsList && auctionsList.map((item) => {
            return (
                <Link
                    key={parseInt(item._id)}
                    onClick={props.currentUser ? () => { props.setCurrentAuction(item._id) } : () => { window.scrollTo(0, 0); props.setLogin(true); }}
                    to={props.currentUser  ? `/auction` : '#'}>
                    <OneAuction key={parseInt(item._id)} item={item} />
                </Link>
            )
        })}
    </>
    );
}
const mapStateToProps = (state) => {
    return {
       currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps, { setLogin, setCurrentAuction ,updateCurrentUser})(AuctionsList);


