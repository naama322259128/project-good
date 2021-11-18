import ProductInCart from './ProductInCart'
import { Link } from 'react-router-dom'
import './Auction.scss';
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

            {/* מערך רק של המוצרים מהמכירה הזו */}
            {props.user && props.user.shoppingCartOfCurrentAuction && props.user.shoppingCartOfCurrentAuction.map((item, index) => {
                return (<ProductInCart key={parseInt(index)} item={item} /*setCount={props.setCnt}*/ />)
            })}

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
