import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import CurrentAuction from '../auction/CurrentAuction';
import Cart from '../auction/Cart';
import './Auction.scss';
import PurchaseSettings from './PurchaseSettings';
import { dataUpdate } from '../../store/actions/user';
const Auction = (props) => {


    useEffect(() => {
        //props.dataUpdate();
    })

    return (<>
        <Switch>
            <Route path={'/auction/cart/purchaseSettings'}><PurchaseSettings /></Route>
            <Route path={`/auction/cart`}><Cart /></Route>
            <Route path={`/auction`}><CurrentAuction /></Route>
        </Switch>
    </>
    );
}
const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        currentAuction: state.currentAuction.currentAuction
    }
}
export default connect(mapStateToProps, {dataUpdate})(Auction);
