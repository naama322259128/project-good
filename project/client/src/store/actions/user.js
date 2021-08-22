import * as actionTypes from '../actionTypes';
import axios from 'axios';

//הוספת מוצר לסל
export const addProductToCart = (product, cnt) => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART,
        payload: { cnt: cnt, product: product }
    }
}
//מחיקת מוצר מסל
export const deleteProductFromCart = (_id) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FROM_CART,
        payload: _id
    }
}

export const setCnt = (_id, cnt) => {
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
                dispatch(updateCurrentUser(succ.data));

            }

        })
    }

}


//מביא את כל המכירות של המנהל הזה
export const getAuctionsArray = (user) => {
    let manager_id=user._id;
    return (dispatch) => {
        axios.get(`http://localhost:5000/auctions/${manager_id}`).then(succ => {
            console.log(succ.data);
            //if (succ.status != 400) dispatch();
        })
    }
}
