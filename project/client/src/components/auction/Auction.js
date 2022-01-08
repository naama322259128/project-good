import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import Cart from '../auction/Cart';
import './Auction.scss';
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';
import PaymentForm from './PaymentForm';
import AboutAuction from './about/AboutAuction'
import { updateShoppingCart } from '../../store/actions/user';
import ProductList from './ProductList';
import { getProductsInCartByAuctionIdFromDB } from '../../utils/userUtils';
import de from '../../img/defaultLogo.jpg'
import Success from './Success';
const Auction = (props) => {

    useEffect(() => {
        let id = localStorage.getItem("user");
        if (id && props.currentUser == null) {
            let a_id = localStorage.getItem("currentAuction");
            if (a_id) props.setCurrentAuctionByStorage(a_id);
            props.setUserByStorage(id);
        }
        window.scrollTo(0, 0);

    }, [])

    useEffect(() => {
        if (props.currentUser && props.currentAuction) getProductsInCartByAuctionIdFromDB(props.currentUser._id, props.currentAuction._id).then(succ => {
            if (succ.status != 400) { props.updateShoppingCart(succ.data); }
        })
    }, [props.currentAuction])

    return (<>
        <center style={{ color: "#262b96", fontSize: '5vh' }}>{props.currentAuction.name || props.currentAuction.organizationName}</center>
        <Link to={`/auction/about`} >
            <p style={{ position: 'fixed', "top": '12vh', color: "#262b96" }}>About us</p>
            <img src={props.currentAuction.logo||de} style={{ width: '3vw', height: 'auto', position: 'fixed', "top": '15vh' }} />
        </Link>
        <Switch>
            <Route path={'/auction/payment/success'}><Success /></Route>
            <Route path={'/auction/payment'}><PaymentForm /></Route>
            <Route path={'/auction/about'}><AboutAuction /></Route>
            <Route path={`/auction/cart`}><Cart /></Route>
            <Route path={`/auction`}><ProductList /></Route>
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
