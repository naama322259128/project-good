import { connect } from "react-redux";
import OneAuction from './OneAuction';
import { setCurrentAuction } from '../../store/actions/currentAuction'
import { Link } from 'react-router-dom';
import './home.scss';
import { setLogin } from "../../store/actions/home";
import { getAuctionList } from "../../utils/auctionUtil";
import React, { useEffect, useState } from "react";

const AuctionList = (props) => {
     let [auctionList, setAuctionList] = useState([]);

    //הכנסת רשימה של כל המכירות הקיימות במסד נתונים
    useEffect(() => { getAuctionList().then(succ => { setAuctionList(succ.data) }) }, []);


    return (<>
        {auctionList && auctionList.map((item) => {
            return (
                <Link
                    key={parseInt(item._id)}
                    onClick={localStorage.getItem("currentUser") ? () => { props.setCurrentAuction(item._id) } : () => { window.scrollTo(0, 0); props.setLogin(true); }}
                    to={localStorage.getItem("currentUser") ? `/auction` : '#'}>
                    <OneAuction key={parseInt(item._id)} item={item} />
                </Link>
            )
        })}
    </>
    );
}
const mapStateToProps = (state) => {
    return {
        // currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps, { setLogin, setCurrentAuction })(AuctionList);


