import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import CurrentAuction from '../auction/CurrentAuction';
import Cart from '../auction/Cart';
import './Auction.scss';
import PurchaseSettings from './PurchaseSettings';
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';
const Auction = (props) => {


    useEffect(() => {
        let id = localStorage.getItem("user" );
         
        if (id && props.currentUser == null) {
             
            let a_id = localStorage.getItem("currentAuction");
            //let n_a_id = localStorage.getItem("newAuction");
            if (a_id) props.setCurrentAuctionByStorage(a_id);
            //if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }
    }, [])

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
export default connect(mapStateToProps, { setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(Auction);
