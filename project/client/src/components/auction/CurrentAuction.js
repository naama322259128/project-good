import { connect } from "react-redux";
import ProductList from './ProductList';
import React, { useEffect } from 'react';
import Cart from "./Cart";
import { Link } from 'react-router-dom'
import Clock from "./Clock";
import './Auction.scss';
import { updateCurrentAuction } from '../../store/actions/currentAuction'

const CurrentAuction = (props) => {
    return (<>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Link to={`/auction/cart`}><h1>Cart</h1></Link>
        {/* כפתור שמעביר לצפיה בסל */}
        <Clock />
        {/* כאן נוסיף גם שעון, אודות, וכו */}
        <ProductList />
    </>);
}
const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, { updateCurrentAuction })(CurrentAuction);

