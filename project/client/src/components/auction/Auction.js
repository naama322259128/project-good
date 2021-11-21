import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import CurrentAuction from '../auction/CurrentAuction';
import Cart from '../auction/Cart';
import './Auction.scss';
import SmallHeader from '../main/SmallHeader';
import PurchaseSettings from './PurchaseSettings';
import SmallFooter from '../main/SmallFooter';
const Auction = (props) => {




    return (<>
        <SmallHeader />
        <br />

        <Switch>
            <Route path={'/auction/cart/purchaseSettings'}><PurchaseSettings /></Route>
            <Route path={`/auction/cart`}><Cart /></Route>
            <Route path={`/auction`}><CurrentAuction /></Route>
        </Switch>

        <SmallFooter />
    </>
    );
}
const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        currentAuction: state.currentAuction.currentAuction
    }
}
export default connect(mapStateToProps, {})(Auction);
