import * as actionTypes from '../actionTypes';
import axios from 'axios';

//מביא את כל המכירות 
export const getAllAuctionsFromDB = (_id) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/auctions/`).then(succ => {
            if (succ.status != 400) dispatch(setAllAuctions(succ.data));
        })
    }
}

export const setAllAuctions = (arr) => {
    return {
        type: actionTypes.SET_SITE_MANAGER_AUCTIONS,
        payload: arr
    }
}

