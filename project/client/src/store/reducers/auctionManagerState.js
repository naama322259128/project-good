import * as actionTypes from '../actionTypes';
const initialState = {
    auctions: [],
    deleteAuctionModal: false,
    editAuctionModal: false,
    approvalAuctionModal: false,
    disapprovalAuctionModal: false,
    selected_auction_to_options: null //המכירה שנבחרה לצורך מחיקה/עריכה/אישור וזה יהיה רק ע''י מכירה
}
export const auctionManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_APPROVAL_AUCTION_MODAL: {
            return {
                ...state,
                approvalAuctionModal: action.payload,
            }
        }
        case actionTypes.SET_DISAPPROVAL_AUCTION_MODAL: {
            return {
                ...state,
                disapprovalAuctionModal: action.payload,
            }
        }
        case actionTypes.SET_DELETE_AUCTION_MODAL: {
            return {
                ...state,
                deleteAuctionModal: action.payload,
            }
        }
        case actionTypes.DELETE_AUCTION_OF_MANAGER: {
            let arr = state.auctions.
                filter(a => a._id !== action.payload);
            return {
                ...state,
                selected_auction_to_options: null,
                auctions: arr
            }
        }
        case actionTypes.SET_SELECTED_AUCTION_TO_OPTIONS: {
            return {
                ...state,
                selected_auction_to_options: action.payload
            }
        }
        case actionTypes.SET_MANAGER_AUCTIONS: {
            return {
                ...state,
                auctions: action.payload
            }
        }
    }
    return state;
}
