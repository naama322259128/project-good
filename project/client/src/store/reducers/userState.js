import * as actionTypes from '../actionTypes';
export const initialState = {
    currentUser: null,
    loginIsOpen: false,
    shoppingCart: [    //סל מוצרים
        { cnt: 1, product: { _id: "111", name: "in cart", image: "465", description: "osjqw jrngu3i", price: 15 } },
        { cnt: 4, product: { _id: "222", name: "in cart", image: "465", description: "osjqw jrngu3i", price: 15 } },
        { cnt: 18, product: { _id: "333", name: "in cart", image: "465", description: "osjqw jrngu3i", price: 15 } }
    ],
    auctionsArray: []//מה זה
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.SET_CURRENT_USER:
            {
                    return {
                ...state,
                currentUser: action.payload,
            }
            }
        
        case actionTypes.SET_LOGIN:
            return {
                ...state,
                loginIsOpen: action.payload
            }
        case actionTypes.ADD_PRODUCT_TO_CART:
            {
                let _id = action.payload.product._id;
                let cnt = action.payload.cnt;
                let index = state.shoppingCart.findIndex(item => item.product._id == _id);
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
                    filter(p => p.product._id !== action.payload)
                return {
                    ...state,
                    shoppingCart: arr2
                }
            }
        case actionTypes.SET_CNT_PRODUCT_IN_CART:
            {
                let _id = action.payload._id;
                let cnt = action.payload.cnt;
                let index = state.shoppingCart.findIndex(item => item.product._id == _id);
                let arr = [...state.shoppingCart];
                if (index != -1) arr[index].cnt = cnt;
                return {
                    ...state,
                    shoppingCart: arr
                }
            }
        case actionTypes.SIGN_OUT:
            {
                //יציאת משתמש
                //איפוס נתונים
                return {
                    currentUser: null,
                    loginIsOpen: false,
                    yourProfileIsOpen: false,
                    shoppingCart: null
                }
            }
        case actionTypes.UPDATE_USER_STATE: {
            //עידכון משתמש נוכחי
            return {
                ...state,
                shoppingCart: action.payload,
            }
            }
    }
    return state;
}
