import * as actionTypes from '../actionTypes';

//הוספת מוצר לסל
export const addProductToCart = (product) => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART,
        payload: product
    }
}