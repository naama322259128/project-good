import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { setCurrentUser } from './signUp'

//הוספת מוצר לסל
export const addProductToCart = (product, count) => {
    let _id = product._id;
    let arr = JSON.parse(localStorage.getItem("prodactsInCart"));
    let index = arr.findIndex(item => item.product._id == _id);
    if (index == -1) arr.push({ cnt: count, product: _id });
    else arr[index].cnt += count;
    localStorage.setItem("prodactsInCart", JSON.stringify(arr));
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART,
        payload: { cnt: count, product: product }
    }
}
//מחיקת מוצר מסל
export const deleteProductFromCart = (_id) => {

    let arr = JSON.parse(localStorage.getItem("prodactsInCart")).filter(p => p.product._id !== _id);
    localStorage.setItem("prodactsInCart", JSON.stringify(arr));
    return {
        type: actionTypes.DELETE_PRODUCT_FROM_CART,
        payload: _id
    }
}

export const setCnt = (_id, cnt) => {

    let arr = JSON.parse(localStorage.getItem("prodactsInCart"));
    let index = arr.findIndex(item => item.product._id == _id);
    if (index != -1) arr[index].cnt = cnt;

    localStorage.setItem("prodactsInCart", JSON.stringify(arr))
    return {
        type: actionTypes.SET_CNT_PRODUCT_IN_CART,
        payload: { _id: _id, cnt: cnt }
    }
}

export const updateCurrentUser = (user) => {
    return {
        type: actionTypes.UPDATE_CURRENT_USER,
        payload: user
    }
}

export const updateUser = (user) => {
    console.log(user);
    return (dispatch) => {
        axios.put(`http://localhost:5000/users/${user._id}`, user).then(succ => {
            console.log(user);
            console.log(succ.data);
            if (succ.status != 400) {
                // dispatch(updateCurrentUser(succ.data));
                dispatch(dispatch(setCurrentUser(succ.data), localStorage.setItem('currentUser', JSON.stringify(succ.data))));
            }

        })
    }
}

//מראה את הטבלה ההזמנות של משתמש קיים 
//של משתמש קיים ומחזירה את ההזמנות של אותו משתמש _id מקבלת  
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
//של הזמנה ומחזירה את ההזמנה_id מקבלת 
export const getOrderById = (order) => {
    let id = order._id;
    return (dispatch) => {
        axios.get(`http://localhost:5000/orders/${id}`).then(succ => {
            if (succ.status != 400)
                return succ.data;
        })
    }
}

export const signOut = () => {
    localStorage.clear();
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

export const updateUserState = () => {
    //עדכון הסטייט לפי הנתונים שבלוקלסטורג'
    updateCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    //alert("updateUserState")
    return {
        type: actionTypes.UPDATE_USER_STATE,
        payload: JSON.parse(localStorage.getItem("prodactsInCart"))
    };
}


//הוספת הזמנה

export const addOrder = (order) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/orders`, order).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}

//מחזירה הזמנה עפ"י קוד משתמש ומכירה

export const getOrderByToUserCodeAndAuction = (user_id, auction_id) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/orders/${user_id}&${auction_id}`).then(succ => {
            if (succ.status != 400) {
                const arr = (succ.data).orderDetails;
                dispatch(localStorage.setItem("prodactsInCart", JSON.stringify(arr)));
            }
        })
    }
}