import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { updateCurrentUser } from './user'
//מביא את כל המכירות של המנהל הזה
export const getAuctionsArray = (user) => {
    //let manager_id='611c2f2e18f13934fc07bc27';
    let manager_id = user._id;
    return (dispatch) => {
        axios.get(`http://localhost:5000/auctions/getAuctionsByManagerId/${manager_id}`).then(succ => {
            console.log(succ.data);
            //if (succ.status != 400) dispatch();
        })
    }
}
//הצגת מודלים
export const setEditAuctionModal = (b, _id) => {
    return {
        type: actionTypes.SET_EDIT_AUCTION_MODAL,
        payload: { b: b, _id: _id }
    }
}
export const setDeleteAuctionModal = (b, _id) => {
    return {
        type: actionTypes.SET_DELETE_AUCTION_MODAL,
        payload: { b: b, _id: _id }
    }
}
export const setApprovalAuctionModal = (b, _id) => {
    return {
        type: actionTypes.SET_APPROVAL_AUCTION_MODAL,
        payload: { b: b, _id: _id }
    }
}
export const setDisApprovalAuctionModal = (b, _id) => {
    return {
        type: actionTypes.SET_DISAPPROVAL_AUCTION_MODAL,
        payload: { b: b, _id: _id }
    }
}
export const setSelectedAuctionToOptions = (_id) => {
    return {
        type: actionTypes.SET_SELECTED_AUCTION_TO_OPTIONS,
        payload: _id
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
export const updateAuction = (_id, auction) => {
    //TODO
    alert("updated!!");
    return {
        //זה סתם רק בגלל השגיאה
        //לעשות עדכון במסד נתונים
        //ואז למחוק את הרטרן הזה
        type: actionTypes.SET_EDIT_AUCTION_MODAL,
        payload: false
    }
}
export const approvalAuction = (a_id, status) => {
    // TODO       put/get ??
    if (status) alert("approved!!");
    else alert("disapproved")
    return {
        //זה סתם רק בגלל השגיאה
        //לעשות עדכון במסד נתונים
        //ואז למחוק את הרטרן הזה
        type: actionTypes.SET_APPROVAL_AUCTION_MODAL,
        payload: false
    }

    /* return (dispatch) => {
         axios.put(`http://localhost:5000/auctions/approvalAuction/${a_id}&${status}`).then(succ => {
             console.log(succ.data);
             //if (succ.status != 400) dispatch();
         })
     }*/
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
export const getAuctionIsDone = (_id) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/auctions/getAuctionIsDone/${_id}`).then(succ => {
            console.log(succ.data);
            //if (succ.status != 400) dispatch();
        })
    }
}

/*
export const updateAuctionManagerState = () => {
    //TODO: אפשר?
    updateCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    return {
        type: actionTypes.UPDATE_AUCTION_MANAGER_STATE,
        payload: JSON.parse(localStorage.getItem("selected_auction_to_options"))
    };
}
*/
