import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { signIn } from './signIn';
import { setCurrentAuction } from './currentAuction';
import { setNewAuction } from './newAuction';

export const setCurrentUser = (user) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: user
    }
}
export const setWantContact = (b) => {
    debugger;
    return {
        type: actionTypes.SET_WANT_CONTACT,
        payload: b
    }
}


export const setUserOrders = (orders) => {
    return {
        type: actionTypes.SET_USER_ORDERS,
        payload: orders
    }
}

//בלחיצה על כפתור הצג הזמנה 
export const getOrderByIdFromDB = (order) => {
    let id = order._id;
    return (dispatch) => {
        axios.get(`http://localhost:5000/orders/${id}`).then(succ => {
            if (succ.status != 400)
                return succ.data;
        })
    }
}
export const dataUpdate = () => {
    let id = localStorage.getItem("user");
    let a_id = localStorage.getItem("currentAuction");
    let n_a_id = localStorage.getItem("newAuction");

    //TODO:
    // if (props.currentUser == null && id) {

    if (id) axios.get(`http://localhost:5000/users/${id}`).
        then(succ => { if (succ.status != 400) signIn(succ.data.password, succ.data.email) });

    if (a_id) axios.get(`http://localhost:5000/auctions/${a_id}`).
        then(succ => { if (succ.status != 400) setCurrentAuction(succ.data) });

    if (n_a_id) axios.get(`http://localhost:5000/auctions/${n_a_id}`).
        then(succ => { if (succ.status != 400) setNewAuction(succ.data) });

    return { a: 1 }
    // }
}

export const signOut = () => {
    localStorage.removeItem("user")
    return {
        type: actionTypes.SIGN_OUT
    }
}

export const updateShoppingCart = (arr) => {
    return {
        type: actionTypes.UPDATE_SHOPPING_CART,
        payload: arr
    }
}