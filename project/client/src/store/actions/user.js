import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { setCurrentUser } from './signUp'


export const updateCurrentUser = (user) => {
    return {
        type: actionTypes.UPDATE_CURRENT_USER,
        payload: user
    }
}

//עדכון פרטי משתמש
export const updateUserInDB = (user) => {
    return axios.put(`http://localhost:5000/users/${user._id}`, user);
}

//של משתמש ומחזירה את ההזמנות של אותו משתמש _id מקבלת  
export const getOrdersList = (user) => {
    let id = user._id;
    return (dispatch) => {
        axios.get(`http://localhost:5000/orders/orderList/${id}`).then(succ => {
            if (succ.status != 400)
                return succ.data;
        })
    }
}

//בלחיצה על כפתור הצג הזמנה 
export const getOrderById = (order) => {
    let id = order._id;
    return (dispatch) => {
        axios.get(`http://localhost:5000/orders/${id}`).then(succ => {
            if (succ.status != 400)
                return succ.data;
        })
    }
}

export const addOrderToState = (order) => {
    return {
        type: actionTypes.ADD_ORDER,
        payload: order
    }
}

export const signOut = () => {
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

export const addOrderToDB = (order) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/orders`, order).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}

//מחזירה הזמנה עפ"י קוד משתמש ומכירה
export const getOrderByUserAndAuction = (user_id, auction_id) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/orders/${user_id}&${auction_id}`).then(succ => {
            if (succ.status != 400) {
                const arr = (succ.data).orderDetails;
                dispatch();
            }
        })
    }
}