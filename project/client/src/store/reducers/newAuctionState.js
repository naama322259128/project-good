import * as actionTypes from '../actionTypes';
import Auction from '../../models/auction'
export const initialState = {
    newAuction: new Auction(),
    // showSetPackage: false,//האם להציג את קומפוננטת קביעת כמות לחבילה AddPackage
    showSetProduct: true,//האם להציג את קומפוננטת  AddProductForm
    finalStepModalIsOpen: true//האם להציג את המודל של האישור הסופי
}
export const newAuctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NEW_AUCTION:
            return {
                ...state,
                newAuction: action.payload
            }
        // case actionTypes.SHOW_ADD_PACKAGE: {
        //     //להציג את הטופס של הוספת חבילה חדשה
        //     return {
        //         ...state,
        //         showSetPackage: true
        //     }
        // }
        // case actionTypes.ADD_PACKAGE: {
        //     //כבר נבדק שלא הוכנה חבילה עם מספר כרטיסים כזה
        //     let arr = [...state.newAuction.purchasePackage, action.payload];
        //     let tmp = state.newAuction;
        //     tmp.purchasePackage = arr;
        //     return {
        //         ...state,
        //         newAuction: tmp,
        //         showSetPackage: false
        //     }
        // }
        // case actionTypes.DELETE_PACKAGE:
        //     let arr2 = state.newAuction.purchasePackage.
        //         filter(p => p._id !== action.payload);
        //     let tmp = state.newAuction;
        //     tmp.purchasePackage = arr2;
        //     return {
        //         ...state,
        //         newAuction: tmp,
        //     };
        case actionTypes.SHOW_ADD_PRODUCT: {
            return {
                ...state,
                showSetProduct: action.payload
            }
        }
        case actionTypes.ADD_PRODUCT: {
            let arr = [...state.newAuction.productList, action.payload];
            let tmp = state.newAuction;
            tmp.productList = arr;
            return {
                ...state,
                newAuction: tmp,
                showSetProduct: false
            }
        }
        //מעדכן את רשימת מוצרים
        case actionTypes.SET_PRODUCTS_LIST: {
            let tmp = state.newAuction;
            tmp.productList = action.payload
            return {
                ...state,
                newAuction: tmp
            }
        }
        //מעדכן את רשימת החבילות
        // case actionTypes.SET_PACKAGES_LIST: {
        //     let tmp = state.newAuction;
        //     tmp.purchasePackage = action.payload;
        //     return {
        //         ...state,
        //         newAuction: tmp
        //     }
        // }
        case actionTypes.DELETE_PRODUCT: {
            let arr4 = state.newAuction.productList.
                filter(p => p._id !== action.payload);
            let tmp = state.newAuction;
            tmp.productList = arr4;
            return {
                ...state,
                newAuction: tmp
            };
        }
        case actionTypes.SET_FINAL_STEP:
            return {
                ...state,
                finalStepModalIsOpen: action.payload
            }
        case actionTypes.UPDATE_NEW_AUCTION_STATE:
            return {
                ...state,
                // showSetPackage: action.payload.showSetPackage,
                showSetProduct: action.payload.showSetProduct,
            }
        case actionTypes.RESET_NEW_AUCTION_STATE:
            //איפוס הסטייט לאחר בניית מכירה
            return {
                //TODO מה לעשות פה
                newAuction: new Auction(),
                //showSetPrice: false,
                // showSetPackage: false,
                showSetProduct: true,
                finalStepModalIsOpen: true
            }
    }
    return state;
}
