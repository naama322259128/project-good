import * as actionTypes from '../actionTypes';
import { allAuctions } from './mainState'
const initialState = {
    //registrationEndDate: new Date(2021, 10, 9, 17, 0, 0),//תאריך אחרון להרשמה
    //productsList: [],//רשימת מוצרים של מכירה זו

    currentAuction: ""
}
export const currentAuctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_AUCTION:
            {
                return {
                    ...state,
                    //קיבלנו לכאן קוד מכירה
                    currentAuction: action.payload
                }

            }
        case actionTypes.UPDATE_CURRENT_AUCTION_STATE:
            {
                return {
                    ...state,
                    currentAuction: action.payload
                }

            }
    }
    return state;
}
