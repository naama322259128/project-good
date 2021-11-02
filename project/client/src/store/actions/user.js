import * as actionTypes from '../actionTypes';
import axios from 'axios';


export const setCurrentUser = (user) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: user
    }
}

//עדכון פרטי משתמש
export const updateUserInDB = (user) => {
    return (dispatch) => {
        return axios.put(`http://localhost:5000/users/${user._id}`, user).then(succ => {
            if (succ.status != 400) {
                dispatch(setCurrentUser(succ.data))
            }
        });;
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

export const addOrder = (order) => {
    return {
        type: actionTypes.ADD_ORDER,
        payload: order
    }
}

export const addProductToCart = (cnt, product) => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART,
        payload: {
            cnt: cnt,
            product: product
        }
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
                dispatch(console.log(succ.data), addOrder(succ.data));
        })
    }
}

//מחזירה הזמנה עפ"י קוד משתמש ומכירה
export const getOrderByUserAndAuctionFromDB = (user_id, auction_id) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/orders/${user_id}&${auction_id}`).then(succ => {
            if (succ.status != 400) {
                const arr = (succ.data).orderDetails;
                dispatch();
            }
        })
    }
}
export const deleteProductFromCart = (_id) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FROM_CART,
        payload: _id
    }
}


