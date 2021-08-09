import * as actionTypes from '../actionTypes';

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
