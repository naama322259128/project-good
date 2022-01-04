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
    return {
        type: actionTypes.SET_WANT_CONTACT,
        payload: b
    }
}
export const setShowDeleteAuctionFromCartModal = (b) => {
    return {
        type: actionTypes.SET_SHOW_DELETE_AUCTION_FROM_CART_MODAL,
        payload: b
    }
}
export const setAllCartArray = (arr) => {
    return {
        type: actionTypes.SET_ALL_CART_ARRAY,
        payload: arr
    }
}
export const setDeleteAuctionFromCart = (auction) => {
    return {
        type: actionTypes.SET_DELETE_AUCTION_FROM_CART,
        payload: auction
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



export const setNewAuctionByStorage = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/auctions/${id}`).
            then(succ => { if (succ.status != 400) dispatch(setNewAuction(succ.data)) });
    }
}

export const setCurrentAuctionByStorage = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/auctions/${id}`).
            then(succ => { if (succ.status != 400) dispatch(setCurrentAuction(succ.data)) });
    }
}
export const setUserByStorage = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/users/${id}`).
            then(succ => { if (succ.status != 400) dispatch(signIn(succ.data.password, succ.data.email)) });
    }
}



export const signOut = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("newAuction")
    localStorage.removeItem("currentAuction")
    window.location = "http://localhost:3000/home";
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
