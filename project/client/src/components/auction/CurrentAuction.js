import { connect } from "react-redux";
import ProductList from './ProductList';
import React from 'react';
import { Link } from 'react-router-dom'
import Timer from "./Timer";
import './Auction.scss';

const CurrentAuction = (props) => {

    return (<>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Link to={`/auction/cart`}><h1>Cart</h1></Link>
        {/* כפתור שמעביר לצפיה בסל */}
        <Timer />
        {/* כאן נוסיף גם שעון, אודות, וכו */}
        <ProductList />
    </>);
}
const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, {})(CurrentAuction);

