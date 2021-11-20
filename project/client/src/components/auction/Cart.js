import ProductInCart from './ProductInCart'
import { Link } from 'react-router-dom'
import './Cart.scss';
import Button from '@material-ui/core/Button';
import Order from '../../models/order';
import { updateShoppingCart } from '../../store/actions/user';
import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import { emptyTheBasketByAuction, addOrderToDB } from '../../utils/userUtils';
import { getProductsInCartByAuctionIdFromDB } from '../../utils/userUtils';

const Cart = (props) => {

    const amountToPay = () => {
        let sum = 0;
        props.user.shoppingCartOfCurrentAuction.map((item) => { sum += item.qty * item.productId.price });
        return sum;
    }

    const tmp = [
        {
            productId: {
                "includedInPackages": false,
                "_id": "6177ceceee8b6f95a2752451",
                "name": "kitchen",
                "description": "very good kitchen. the best present for every women!!",
                "price": 1
            },
            qty: 3
        },
        {
            productId: {
                "includedInPackages": false,
                "_id": "6177cfdbee8b6f95a2752452",
                "name": "5000 NIS for IKEA",
                "description": "",
                "price": 1
            }, qty: 3
        },
        {
            productId: {
                "includedInPackages": false,
                "_id": "6177d2e2ee8b6f95a2752454",
                "name": "Courtyard pool",
                "description": "",
                "price": 1
            }, qty: 1
        }];

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
        getProductsInCartByAuctionIdFromDB(props.user.currentUser._id, props.currentAuction._id).then(succ => {
            if (succ.status != 400) { props.updateShoppingCart(succ.data); }
        })
    }, [])


    /*
    המבנה בסרבר    
     shoppingCart: [{
        productId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product' },
        qty: Number,
        auctionId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Auction' }
    }]*/
    return (
        <div>
            <h1>Cart Component</h1>
            <Link to={'/auction'}>Back</Link>{/*לצאת מהסל, חזרה לכל המוצרים*/}

            <div id="cart-products-container">
                {/* מערך רק של המוצרים מהמכירה הזו */}
                {/*props.user && props.user.shoppingCartOfCurrentAuction && props.user.shoppingCartOfCurrentAuction*/tmp.map((item, index) => {
                    return (<ProductInCart key={parseInt(index)} qty={item.qty} productInCart={item.productId} /*setCount={props.setCnt}*/ />)
                })}
            </div>
            <Button onClick={orderCompletion}>OK</Button>{/* כפתור אישור פה יועבר כל בסל מהלוקל סטורג למסד נתונים*/}

            {/* TODO: איך התצוגה תתרענן פה */}
            {props.user && props.user.shoppingCartOfCurrentAuction && amountToPay()}
            {/* ולשלוח את הסכום שנדרש לשלם pay apl-פה צריך להתממשק ל */}
        </div>);
}

const mapStateToProps = state => {
    return {
        user: state.user,
        currentAuction: state.currentAuction.currentAuction
    }
}
export default connect(mapStateToProps, { updateShoppingCart })(Cart);