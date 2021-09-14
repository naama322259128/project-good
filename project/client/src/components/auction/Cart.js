import { connect } from "react-redux";
import ProductInCart from './ProductInCart'
import { setCnt } from '../../store/actions/user'
import { Link } from 'react-router-dom'
import './Auction.scss';
import { useState } from "react";
import Button from '@material-ui/core/Button';
import { addOrderToDB } from '../../store/actions/user';
import Order from '../../models/order';
import { useStorageReducer } from 'react-storage-hooks';
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState.js'
import * as actionTypes from '../../store/actionTypes'

const Cart = (props) => {

    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'user',
        reducer,
        userState
    );

    const amountToPay = () => {
        let sum = 0;
        state.shoppingCart.map((item) => { sum = item.cnt * item.product.price });
        return sum;
    }

    const OrderCompletion = () => {
        const newOrder = new Order(
            state.currentUser,
            state.shoppingCart,
            "",//אחרי זה להכניס קוד תשלום
            amountToPay(),
            JSON.parse(localStorage.getItem("currentAcution")).currentAuction,
            [],//להוסיף בחירת מתנות
            new Date()
        );
        dispatch({
            type: actionTypes.ADD_ORDER,
            payload: newOrder
        })
    }

    return (
        <div>
            <br />
            <br />
            <h1>Cart Component</h1>
            <Link to={'/auction'}>Back</Link>{/*לצאת מהסל, חזרה לכל המוצרים*/}
            {state.shoppingCart.map((item, index) => {
                return (<ProductInCart key={parseInt(index)} item={item} /*setCount={props.setCnt}*/ />)
            })}
            {/* כפתור אישור פה יועבר כל בסל מהלוקל סטורג למסד נתונים*/}
            <Button onClick={OrderCompletion}>OK</Button>
            {amountToPay()}
            {/* ולשלוח את הסכום שנדרש לשלם pay apl-פה צריך להתממשק ל */}
        </div>);
}
const mapStateToProps = (state) => {
    return {
        // arr: state.user.shoppingCart,
    }
}

export default connect(mapStateToProps, { /*setCnt, addOrderToDB*/ })(Cart);