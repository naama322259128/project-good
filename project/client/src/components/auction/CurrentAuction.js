import { connect } from "react-redux";
import ProductList from './ProductList';
import React, { useEffect } from 'react';
import Cart from "./Cart";
import { Link } from 'react-router-dom'
import Timer from "./Timer";
import './Auction.scss';
import { updateCurrentAuction } from '../../store/actions/currentAuction'
import { useStorageReducer } from 'react-storage-hooks';
import { currentAuctionReducer as reducer, initialState as currentState } from '../../store/reducers/currentAuctionState.js'
import * as actionTypes from '../../store/actionTypes'

const CurrentAuction = (props) => {
    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'currentAuction',
        reducer,
        currentState
    );
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

export default connect(mapStateToProps, { updateCurrentAuction })(CurrentAuction);

