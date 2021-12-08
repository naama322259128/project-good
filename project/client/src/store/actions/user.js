import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const setCurrentUser = (user) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: user
    }
}
export const setWantContact=(b)=>{
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


// export const addProductToCart = (cnt, product) => {
//     return {
//         type: actionTypes.ADD_PRODUCT_TO_CART,
//         payload: {
//             cnt: cnt,
//             product: product
//         }
//     }
// }

export const signOut = () => {
    //TODO מה עושה אם אני אומרת לו למחוק אייטם שלא קיים
    localStorage.setItem("login", "false");
    localStorage.removeItem("pass");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
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

// export const deleteProductFromCart = (_id) => {
//     return {
//         type: actionTypes.DELETE_PRODUCT_FROM_CART,
//         payload: _id
//     }
// }





