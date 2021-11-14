import * as actionTypes from '../actionTypes';
export const initialState = {
    currentUser: null,
    loginIsOpen: false,
    ordersList: [],//?
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGIN:
            return {
                ...state,
                loginIsOpen: action.payload
            }
        case actionTypes.SET_CURRENT_USER:
            {
                return {
                    ...state,
                    currentUser: action.payload,
                }
            }
        case actionTypes.SIGN_IN_OF_STATE: {
            return {
                ...state,
                currentUser: action.payload,
                loginIsOpen: false
            }
        }
        case actionTypes.UPDATE_SHOPPING_CART: {
            let tmp = state.currentUser;
            tmp.shoppingCart = action.payload;
            return {
                ...state,
                currentUser: tmp
            }
        }
        // case actionTypes.ADD_PRODUCT_TO_CART:
        //     {
        //         let _id = action.payload.product._id;
        //         let cnt = action.payload.cnt;
        //         let index = state.currentUser.shoppingCart.findIndex(item => item.product._id == _id);
        //         let arr = [...state.currentUser.shoppingCart];
        //         if (index == -1) arr.push(action.payload);
        //         else arr[index].cnt += cnt;
        //         return {
        //             ...state,
        //             shoppingCart: arr
        //         }
        //     }
        // case actionTypes.DELETE_PRODUCT_FROM_CART:
        //     {
        //         let arr2 = state.shoppingCart.
        //             filter(p => p.product._id !== action.payload)
        //         return {
        //             ...state,
        //             shoppingCart: arr2
        //         }
        //     }
        // case actionTypes.SET_CNT_PRODUCT_IN_CART:
        //     {
        //         let _id = action.payload._id;
        //         let cnt = action.payload.cnt;
        //         let index = state.shoppingCart.findIndex(item => item.product._id == _id);
        //         let arr = [...state.shoppingCart];
        //         if (index != -1) arr[index].cnt = cnt;
        //         return {
        //             ...state,
        //             shoppingCart: arr
        //         }
        //     }
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
        case actionTypes.SET_USER_ORDERS: {
            return {
                ...state,
                ordersList: action.payload
            }
        }
    }
    return state;
}
