import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import CurrentAuction from '../auction/CurrentAuction';
import Cart from '../auction/Cart';
import './Auction.scss';
import SmallHeader from '../main/SmallHeader';
import SmallFooter from '../main/SmallFooter';
import { getProductsInCartByAuctionIdFromDB } from '../../utils/userUtils';
import { updateShoppingCart } from '../../store/actions/user';
const Auction = (props) => {


    useEffect(() => {
        getProductsInCartByAuctionIdFromDB(props.currentUser._id, props.currentAuction._id).then(succ => {
            if (succ.status != 400) { props.updateShoppingCart(succ.data); }
        })
    }, [])


    return (<>
        <SmallHeader />
        <br />

        <Switch>
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
export default connect(mapStateToProps, { updateShoppingCart })(Auction);
