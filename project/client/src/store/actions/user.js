import * as actionTypes from '../actionTypes';
import axios from 'axios';

//הוספת מוצר לסל
export const addProductToCart = (product,cnt) => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART,
        payload: {cnt:cnt,product:product}
    }
}
//מחיקת מוצר מסל
export const deleteProductFromCart = (code) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FROM_CART,
        payload: code
    }
}

export const setCnt = (code,cnt) => {
    return {
        type: actionTypes.SET_CNT_PRODUCT_IN_CART,
        payload: {code:code,cnt:cnt}
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
                dispatch(updateCurrentUser(succ.data));

            }

        })
    }

}