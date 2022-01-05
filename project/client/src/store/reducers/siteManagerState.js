import * as actionTypes from '../actionTypes';
const initialState = {
    auctions: []
}
export const siteManagerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SITE_MANAGER_AUCTIONS: {
            return {
                ...state,
                auctions: action.payload
            }
        }
    }

    return state;
}
