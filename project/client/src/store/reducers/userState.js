import * as actionTypes from '../actionTypes';
export const initialState = {
    currentUser: null,
    loginIsOpen: false,
    ordersList: [],//?
    shoppingCartOfCurrentAuction: [],
    wantContact: false,
    shoppingCartAll: [],
    myAuctionsToSet: [],//המכירות שלו שעדיין לא אושרו לתצוגה
    showDeleteAuctionFromCartModal: false,
    allCartArray: [],
    deleteAuctionFromCart: null
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGIN:
            return {
                ...state,
                loginIsOpen: action.payload
            }
        case actionTypes.SET_WANT_CONTACT:
            return {
                ...state,
                wantContact: action.payload
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
            return {
                ...state,
                shoppingCartOfCurrentAuction: action.payload
            }
        }
        case actionTypes.SET_MY_AUCTIONS_TO_SET: {
            return {
                ...state,
                myAuctionsToSet: action.payload
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
                    shoppingCart: [],
                    wantContact: false
                }
            }
        case actionTypes.UPDATE_USER_STATE: {
            //עידכון משתמש נוכחי
            return {
                ...state,
                //TODO ??
            }
        }
        case actionTypes.SET_USER_ORDERS: {
            return {
                ...state,
                ordersList: action.payload
            }
        }
        case actionTypes.SET_SHOW_DELETE_AUCTION_FROM_CART_MODAL: {
            return {
                ...state,
                showDeleteAuctionFromCartModal: action.payload
            }
        }
        case actionTypes.SET_ALL_CART_ARRAY: {
            return {
                ...state,
                allCartArray: action.payload
            }
        }
        case actionTypes.SET_DELETE_AUCTION_FROM_CART: {
            return {
                ...state,
                deleteAuctionFromCart: action.payload
            }
        }
    }
    return state;
}
