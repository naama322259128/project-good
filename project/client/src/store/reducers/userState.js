import * as actionTypes from '../actionTypes';
const initialState = {
    currentUser: null,
    loginIsOpen: false,
    shoppingCart: [
        { cnt:1,   product:    { code: "111", name:"aaa", image: "465", description: "osjqw jrngu3i", price: 15 }},
        { cnt:4,   product:    { code: "222", name:"aaa", image: "465", description: "osjqw jrngu3i", price: 15 }},
        { cnt:18,   product:    { code: "333", name:"aaa", image: "465", description: "osjqw jrngu3i", price: 15 }},
        { cnt:3,   product:    { code: "444", name:"aaa", image: "465", description: "osjqw jrngu3i", price: 15 }}

    ],//סל מוצרים
    showCart:false
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
                let arr = [...state.shoppingCart, action.payload];

                return {
                    ...state,
                    shoppingCart: arr
                }
            }
            case actionTypes.DELETE_PRODUCT_FROM_CART:
                {
                    let arr2 = state.shoppingCart.
                    filter(p=>p.product.code!==action.payload)
                    return {
                        ...state,
                        shoppingCart: arr2
                    }
                } 
                 case actionTypes.SET_SHOW_CART:
                {
                    return {
                        ...state,
                        showCart: action.payload
                    }
                }
    }

    return state;
}
// export default userReducer;