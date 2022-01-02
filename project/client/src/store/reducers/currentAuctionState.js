import Auction from '../../models/auction';
import * as actionTypes from '../actionTypes';
export const initialState = {
    currentAuction: new Auction()
}
export const currentAuctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_AUCTION:
            {
                return {
                    currentAuction: action.payload
                }

            }
    }
    return state;
}
