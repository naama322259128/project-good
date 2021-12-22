import ProductInCart from './ProductInCart'
import { Link } from 'react-router-dom'
import './Cart.scss';
import Button from '@material-ui/core/Button';
import Order from '../../models/order';
import { updateShoppingCart } from '../../store/actions/user';
import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import { emptyTheCartByAuction, addOrderToDB } from '../../utils/userUtils';
import { getProductsInCartByAuctionIdFromDB } from '../../utils/userUtils';
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';
const Cart = (props) => {

    const amountToPay = () => {
        let sum = 0;
        if (props.user.shoppingCartOfCurrentAuction.length == 0) return 0;
        props.user.shoppingCartOfCurrentAuction.map((item) => { sum += item.qty * item.productId.price });
        return sum;
    }



    const orderCompletion = () => {
        const newOrder = new Order(
            props.currentUser,
            props.user.shoppingCartOfCurrentAuction,
            "",//אחרי זה להכניס קוד תשלום
            amountToPay(),
            props.currentAuction._id,
            [],//להוסיף בחירת מתנות
            new Date()
        );

        //הפונקציה הזו מוסיפה לטבלת ההזמנות ומוחקת למשתמש את המוצרים של המכירה הזו מהסל
        addOrderToDB(newOrder).then(succ => {
            if (succ.status != 400) {
                props.updateShoppingCart([]);
            }
        })

    }


    useEffect(() => {
        let id = localStorage.getItem("user");

        if (id && props.currentUser == null) {

            let a_id = localStorage.getItem("currentAuction");
            //  let n_a_id = localStorage.getItem("newAuction");
            if (a_id) props.setCurrentAuctionByStorage(a_id);
            // if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }

    }, [])


    useEffect(() => {
        if (props.currentUser) getProductsInCartByAuctionIdFromDB(props.user.currentUser._id, props.currentAuction._id).then(succ => {
            if (succ.status != 400) { props.updateShoppingCart(succ.data); }
        })
    }, [props.currentUser])

    return (
        <div>

            <h1>Cart Component</h1>
            <Link to={'/auction'}>Back</Link>{/*לצאת מהסל, חזרה לכל המוצרים*/}

            <div id="cart-products-container">
                {/* מערך רק של המוצרים מהמכירה הזו */}
                {props.user && props.user.shoppingCartOfCurrentAuction && props.user.shoppingCartOfCurrentAuction.map((item, index) => {
                    return (<ProductInCart key={parseInt(index)} qty={item.qty} productInCart={item.productId} />)
                })}
            </div>

            {props.user && props.user.shoppingCartOfCurrentAuction && amountToPay() != 0 && <Button onClick={orderCompletion}>PAY</Button>}

            {/* TODO: איך התצוגה תתרענן פה */}
            {props.user && props.user.shoppingCartOfCurrentAuction && amountToPay() != 0 && <h1>{amountToPay() + "₪"}</h1>}
            {/* ולשלוח את הסכום שנדרש לשלם pay apl-פה צריך להתממשק ל */}
        </div>);
}

const mapStateToProps = state => {
    return {
        user: state.user,
        currentAuction: state.currentAuction.currentAuction,
        currentUser: state.user.currentUser
    }
}
export default connect(mapStateToProps, { updateShoppingCart, setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage })(Cart);