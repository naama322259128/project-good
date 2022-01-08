import './Cart.scss';
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getProductsInCartByAuctionIdFromDB } from '../../utils/userUtils';
import { setUserByStorage, setCurrentAuctionByStorage } from '../../store/actions/user';
import { updateShoppingCart } from '../../store/actions/user';
import { Link } from 'react-router-dom'
import Order from '../../models/order';
import { addOrderToDB } from '../../utils/userUtils';
import Button from '@mui/material/Button';

const PaymentForm = (props) => {
    const amountToPay = () => {
        let sum = 0;
        if (props.user.shoppingCartOfCurrentAuction.length == 0) return 0;
        props.user.shoppingCartOfCurrentAuction.map((item) => { sum += item.qty * item.productId.price });
        return sum;
    }


    const orderCompletion = () => {
        const newOrder = new Order(
            props.currentUser._id,
            props.user.shoppingCartOfCurrentAuction,
            "OK",//אחרי זה להכניס קוד תשלום
            amountToPay(),
            props.currentAuction._id,
            new Date()
        );

        debugger;

        //הפונקציה הזו מוסיפה לטבלת ההזמנות ומוחקת למשתמש את המוצרים של המכירה הזו מהסל
        addOrderToDB(newOrder).then(succ => {
            if (succ.status != 400) {
                props.updateShoppingCart([]);
                window.location="http://localhost:3000/home"
            }
        })

    }

    useEffect(() => {
        let id = localStorage.getItem("user");
        if (id && props.currentUser == null) {
            let a_id = localStorage.getItem("currentAuction");
            if (a_id) props.setCurrentAuctionByStorage(a_id);
            props.setUserByStorage(id);
        }
    }, [])


    useEffect(() => {
        if (props.currentUser) getProductsInCartByAuctionIdFromDB(props.user.currentUser._id, props.currentAuction._id).then(succ => {
            if (succ.status != 400) { props.updateShoppingCart(succ.data); }
        })
    }, [props.currentUser])

    return (<center>
        <br />
        <h1 style={{ color: "#262b96" }}>Amount to pay: {amountToPay()}$</h1>
        <br />
        <PayPalScriptProvider options={{ "client-id": "test" }} >
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>

        <Link to={'/auction/payment/success'}>
            <Button onClick={ orderCompletion} style={{ backgroundColor: "#e0e0e0", color: "#262b96" }} variant="contained" color="primary" component="span">
                Add Order
            </Button></Link>
    </center>
    );
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        currentAuction: state.currentAuction.currentAuction,
        user: state.user,
    }
}
export default connect(mapStateToProps, { setUserByStorage, setCurrentAuctionByStorage, updateShoppingCart })(PaymentForm);

