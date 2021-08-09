import * as actionTypes from '../actionTypes';

//הוספת מוצר לסל
export const addProductToCart = (product) => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART,
        payload: product
    }
}
//מחיקת מוצר מסל
export const deleteProductFromCart = (code) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FROM_CART,
        payload: code
    }
}

