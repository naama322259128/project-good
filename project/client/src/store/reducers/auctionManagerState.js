import * as actionTypes from '../actionTypes';
const initialState = {
    deleteAuctionModal: false,
    editAuctionModal: false,
    approvalAuctionModal: false,
    disapprovalAuctionModal: false,
    selected_auction_to_options: null  //המכירה שנבחרה לצורך מחיקה/עריכה/אישור וזה יהיה רק ע''י מכירה
}
export const auctionManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_EDIT_AUCTION_MODAL: {
            return {
                ...state,
                editAuctionModal: action.payload.b,
                selected_auction_to_options:action.payload._id
            }
        }
        case actionTypes.SET_APPROVAL_AUCTION_MODAL: {
            return {
                ...state,
                approvalAuctionModal: action.payload.b,
                selected_auction_to_options:action.payload._id
            }
        }
         case actionTypes.SET_DISAPPROVAL_AUCTION_MODAL: {
            return {
                ...state,
                disapprovalAuctionModal: action.payload.b,
                selected_auction_to_options:action.payload._id
            }
        }
        case actionTypes.SET_DELETE_AUCTION_MODAL: {
            return {
                ...state,
                deleteAuctionModal: action.payload.b,
                selected_auction_to_options:action.payload._id
            }
        }
        case actionTypes.SET_SELECTED_AUCTION_TO_OPTIONS: {
            return {
                ...state,
                selected_auction_to_options: action.payload
            }
        }
    }

    return state;
}
//כשנעשה סיין-אאוט מהמשתמש
//מה יהא על המשתנים בסטייט הזה