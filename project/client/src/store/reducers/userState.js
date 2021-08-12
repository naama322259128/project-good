import * as actionTypes from '../actionTypes';
const initialState = {
    currentUser: null,
    loginIsOpen: false,
    shoppingCart: [
        { cnt: 1, product: { code: "111", name: "in cart", image: "465", description: "osjqw jrngu3i", price: 15 } },
        { cnt: 4, product: { code: "222", name: "in cart", image: "465", description: "osjqw jrngu3i", price: 15 } },
        { cnt: 18, product: { code: "333", name: "in cart", image: "465", description: "osjqw jrngu3i", price: 15 } }
    ]//סל מוצרים
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                loginIsOpen: false
            }
        case actionTypes.SET_LOGIN:
            return {
                ...state,
                loginIsOpen: action.payload
            }
        case actionTypes.ADD_PRODUCT_TO_CART:
            {
                let code = action.payload.product.code;
                let cnt = action.payload.cnt;
                let index = state.shoppingCart.findIndex(item => item.product.code == code);
                let arr = [...state.shoppingCart];
                if (index == -1) arr.push(action.payload);
                else arr[index].cnt += cnt;
                return {
                    ...state,
                    shoppingCart: arr
                }
            }
        case actionTypes.DELETE_PRODUCT_FROM_CART:
            {
                let arr2 = state.shoppingCart.
                    filter(p => p.product.code !== action.payload)
                return {
                    ...state,
                    shoppingCart: arr2
                }
            }
        case actionTypes.SET_CNT_PRODUCT_IN_CART:
            {
                let code = action.payload.code;
                let cnt = action.payload.cnt;
                let index = state.shoppingCart.findIndex(item => item.product.code == code);
                let arr = [...state.shoppingCart];
                if (index != -1) arr[index].cnt = cnt;
                return {
                    ...state,
                    shoppingCart: arr
                }
            }
        case actionTypes.DELETE_CURRENT_USER:
            {
                //מחיקת משתמש האתר מחיקת עגלת הקניות
                return {
                    ...state,
                    currentUser: null,
                    shoppingCart: null
                }
            }
        case actionTypes.UPDATE_CURRENT_USER:
            {
                //עידכון משתמש נוכחי
                return {
                    ...state,
                    currentUser:action.payload,
                }
            }
    }

    return state;
}
// export default userReducer;