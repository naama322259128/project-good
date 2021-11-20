import ProductInCart from './ProductInCart'
import { Link } from 'react-router-dom'
import './Cart.scss';
import Button from '@material-ui/core/Button';
import Order from '../../models/order';
import { updateShoppingCart } from '../../store/actions/user';
import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import { emptyTheBasketByAuction, addOrderToDB } from '../../utils/userUtils';
const Cart = (props) => {

    const amountToPay = () => {
        let sum = 0;
        props.user.shoppingCartOfCurrentAuction.map((item) => { sum += item.qty * item.productId/* איך נגיע למחיר*/ });//TODO
        return sum;
    }

    const tmp = [{
        "includedInPackages": false,
        "_id": "6177ceceee8b6f95a2752451",
        "name": "kitchen",
        "winnerId": "617696a4e42d1737a80d9c60",
        "description": "very good kitchen. the best present for every women!!",
        "price": 1
    },
    {
        "includedInPackages": false,
        "_id": "6177cfdbee8b6f95a2752452",
        "name": "5000 NIS for IKEA",
        "winnerId": "6176976ce42d1737a80d9c62",
        "description": "",
        "price": 1
    },
    {
        "includedInPackages": false,
        "_id": "6177d2d6ee8b6f95a2752453",
        "name": "Table + chairs",
        "winnerId": "617697dae42d1737a80d9c63",
        "description": "",
        "price": 1
    },
    {
        "includedInPackages": false,
        "_id": "6177d2e2ee8b6f95a2752454",
        "name": "Courtyard pool",
        "winnerId": "6176903ae42d1737a80d9c5f",
        "description": "",
        "price": 1
    },
    {
        "includedInPackages": false,
        "_id": "6177d2e8ee8b6f95a2752455",
        "name": "Electric Bicycle",
        "winnerId": "61769917e42d1737a80d9c66",
        "description": "",
        "price": 1
    },
    {
        "includedInPackages": false,
        "_id": "6177d2eeee8b6f95a2752456",
        "name": "video camera",
        "winnerId": "61769707e42d1737a80d9c61",
        "description": "",
        "price": 1
    },
    {
        "includedInPackages": false,
        "_id": "6177d2f3ee8b6f95a2752457",
        "name": "Desktop computer",
        "winnerId": "617698a4e42d1737a80d9c65",
        "description": "",
        "price": 1
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

    return (
        <div>
            <h1>Cart Component</h1>
            <Link to={'/auction'}>Back</Link>{/*לצאת מהסל, חזרה לכל המוצרים*/}

            <div id="cart-products-container">
                {/* מערך רק של המוצרים מהמכירה הזו */}
                {/*props.user && props.user.shoppingCartOfCurrentAuction && props.user.shoppingCartOfCurrentAuction*/tmp.map((item, index) => {
                    return (<ProductInCart key={parseInt(index)} productInCart={item} /*setCount={props.setCnt}*/ />)
                })}
            </div>
            <Button onClick={orderCompletion}>OK</Button>{/* כפתור אישור פה יועבר כל בסל מהלוקל סטורג למסד נתונים*/}

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
