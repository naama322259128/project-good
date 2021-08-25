import * as actionTypes from '../actionTypes';
import axios from 'axios';

//הוספת מוצר לסל
export const addProductToCart = (product, cnt) => {
    return {
        type: actionTypes.ADD_PRODUCT_TO_CART,
        payload: { cnt: cnt, product: product }
    }
}
//מחיקת מוצר מסל
export const deleteProductFromCart = (_id) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FROM_CART,
        payload: _id
    }
}

export const setCnt = (_id, cnt) => {
    return {
        type: actionTypes.SET_CNT_PRODUCT_IN_CART,
        payload: { _id: _id, cnt: cnt }
    }
}


export const updateCurrentUser = (user) => {
    return {
        type: actionTypes.UPDATE_CURRENT_USER,
        payload: user
    }
}
export const updateUser = (user) => {
    console.log(user);

    return (dispatch) => {
        axios.put(`http://localhost:5000/users/${user._id}`, user).then(succ => {
            console.log(user);
            console.log(succ.data);
            if (succ.status != 400) {
                dispatch(updateCurrentUser(succ.data));

            }

        })
    }

}


//מביא את כל המכירות של המנהל הזה
export const getAuctionsArray = (user) => {
    /*************************************************************************************************************************/
    //let manager_id='611c2f2e18f13934fc07bc27';
    let manager_id = user._id;
    return (dispatch) => {
        axios.get(`http://localhost:5000/auctions/getAuctionsByManagerId/${manager_id}`).then(succ => {
            console.log(succ.data);
            //if (succ.status != 400) dispatch();
        })
    }
}
//מראה את הטבלה ההזמנות של משתמש קיים 
//של משתמש קיים ומחזירה את ההזמנות של אותו משתמש _id מקבלת  
export const getOrdersList = (user) => {
    let id = user._id;
    return (dispatch) => {
        axios.get(`http://localhost:5000/orders/orderList/${id}`).then(succ => {
            if (succ.status != 400)
                return succ.data;
        })
    }
}
//בלחיצה על כפתור הצג הזמנה 
//של הזמנה ומחזירה את ההזמנה_id מקבלת 
export const getOrderById = (order) => {
    let id = order._id;
    return (dispatch) => {
        axios.get(`http://localhost:5000/orders/${id}`).then(succ => {
            if (succ.status != 400)
                return succ.data;
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