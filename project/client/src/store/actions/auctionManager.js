import * as actionTypes from '../actionTypes';
import axios from 'axios';

//מביא את כל המכירות של המנהל הזה
export const getManagerAuctionsFromDB = (_id) => {

    return (dispatch) => {
        axios.get(`http://localhost:5000/auctions/getAuctionsByManagerId/${_id}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400) dispatch(setManagerAuctions(succ.data));
        })
    }
}


//הצגת מודלים
export const setDeleteAuctionModal = (b) => {
    return {
        type: actionTypes.SET_DELETE_AUCTION_MODAL,
        payload: b
    }
}
export const setApprovalAuctionModal = (b) => {
    return {
        type: actionTypes.SET_APPROVAL_AUCTION_MODAL,
        payload: b
    }
}
export const setDisApprovalAuctionModal = (b) => {
    return {
        type: actionTypes.SET_DISAPPROVAL_AUCTION_MODAL,
        payload: b
    }
}
export const setSelectedAuctionToOptions = (a) => {
    return {
        type: actionTypes.SET_SELECTED_AUCTION_TO_OPTIONS,
        payload: a
    }
}
export const deleteAuction = (_id) => {
    //TODO
    alert("deleted!!");
    return {
        //זה סתם רק בגלל השגיאה
        //לעשות מחיקה מהמסד נתונים
        //ואז למחוק את הרטרן הזה
        type: actionTypes.SET_DELETE_AUCTION_MODAL,
        payload: false
    }
}

export const setManagerAuctions = (arr) => {
    return {
        type: actionTypes.SET_MANAGER_AUCTIONS,
        payload: arr
    }
}




//האם ההגרלות מאושרות
export const isAuctionApproved = (_id) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/auctions/getAuctionIsApproved/${_id}`).then(succ => {
            console.log(succ.data);
            //if (succ.status != 400) dispatch();
        })
    }
}
//האם ההגרלות התבצעו
export const getAuctionIsDoneFromDB = (_id) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/auctions/getAuctionIsDone/${_id}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400) dispatch();
        })
    }
}
