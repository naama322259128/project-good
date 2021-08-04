import * as actionTypes from '../actionTypes';
import { allAuctions } from './mainState'
const initialState = {

    productsList: []//רשימת מוצרים של מכירה זו
}
export const existingAuctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_AUCTION:
            {

                let auc = allAuctions.find((element) => element.code === action.payload);
                return {
                    //אולי נצטרך להגדיר כאן עוד דברים
                    ...state,
                    //קיבלנו לכאן קוד מכירה
                    //לקחת את מערך המוצרים של המכירה הזו מהשרת
                    //רק בינתיים לקחתי מהסטייט המרכזי
                    productsList: auc.productList
                }
            }
    }
    return state;
}
