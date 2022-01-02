import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import CurrentAuction from '../auction/CurrentAuction';
import Cart from '../auction/Cart';
import './Auction.scss';
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';
import PaymentForm from './PaymentForm';
import AboutAuction from './about/AboutAuction'
import { updateShoppingCart } from '../../store/actions/user';

import { getProductsInCartByAuctionIdFromDB } from '../../utils/userUtils';

const Auction = (props) => {


    useEffect(() => {
        let id = localStorage.getItem("user");

        if (id && props.currentUser == null) {

            let a_id = localStorage.getItem("currentAuction");
            //let n_a_id = localStorage.getItem("newAuction");
            if (a_id) props.setCurrentAuctionByStorage(a_id);
            //if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }
    }, [])

    useEffect(() => {
        if (props.currentUser && props.currentAuction) getProductsInCartByAuctionIdFromDB(props.currentUser._id, props.currentAuction._id).then(succ => {
            if (succ.status != 400) { props.updateShoppingCart(succ.data); }
        })
    }, [props.currentAuction])

    return (<>
        <Switch>
            <Route path={'/auction/payment'}><PaymentForm /></Route>
            <Route path={'/auction/about'}><AboutAuction /></Route>
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
export default connect(mapStateToProps, { setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage, updateShoppingCart })(Auction);
