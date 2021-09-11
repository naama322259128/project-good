import AboutAuction from '../../components/auction/about/AboutAuction';
import * as actionTypes from '../actionTypes';

const initialState = {
    showContactForm: false,
    //  רשימת המכירות באתר שלפנו ישירות מהמסד נתונים
    auctionsList: []
}
export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SHOW_CONTACT_FORM:
            return {
                ...state,
                showContactForm: action.payload
            }
    }
    return state;
}

// export const allAuctions = initialState.auctionsList;