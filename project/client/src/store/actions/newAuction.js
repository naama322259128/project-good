import * as actionTypes from '../actionTypes';
import axios from 'axios';
export const setMyAuctionsToSet = (arr) => {
    return {
        type: actionTypes.SET_MY_AUCTIONS_TO_SET,
        payload: arr
    }
}
// export const showAddPackage = () => {
//     return {
//         type: actionTypes.SHOW_ADD_PACKAGE
//     }
// }
// export const addPackage = (p) => {
//     return {
//         type: actionTypes.ADD_PACKAGE,
//         payload: p
//     }
// }
// export const deletePackage = (p_id) => {
//     return {
//         type: actionTypes.DELETE_PACKAGE,
//         payload: p_id
//     }
// }
export const setOrganizationName = (na) => {
    return {
        type: actionTypes.SET_ORGANIZATION_NAME,
        payload: na
    }
}
export const setOrganizationText = (txt) => {
    return {
        type: actionTypes.SET_ORGANIZATION_TEXT,
        payload: txt
    }
}
export const setorganizationPhotos = (pic) => {
    return {
        type: actionTypes.ADD_PIC_ORGANIZATION,
        payload: pic
    }
}
export const setDateOfStart = (date) => {
    return {
        type: actionTypes.SET_START_DATE,
        payload: date
    }
}
export const setDateOfEnd = (date) => {
    return {
        type: actionTypes.SET_END_DATE,
        payload: date
    }
}
export const setDateOfLotery = (date) => {
    return {
        type: actionTypes.SET_LOTERY_DATE,
        payload: date
    }
}
export const setTerms = (date) => {
    return {
        type: actionTypes.SET_LOTERY_DATE,
        payload: date
    }
}
export const addProduct = (p) => {
    return {
        type: actionTypes.ADD_PRODUCT,
        payload: p
    }
}
export const showAddProduct = (b) => {
    return {
        type: actionTypes.SHOW_ADD_PRODUCT,
        payload: b
    }
}
export const deleteProduct = (p_id) => {
    return {
        type: actionTypes.DELETE_PRODUCT,
        payload: p_id
    }
}

export const setLastModal = (b) => {
    return {
        type: actionTypes.SET_FINAL_STEP,
        payload: b
    }
}
export const resetNewAuctionState = () => {
    return {
        type: actionTypes.RESET_NEW_AUCTION_STATE
    }
}

export const setNewAuction = (newAuction) => {
    localStorage.setItem("newAuction", newAuction._id)
    return {
        type: actionTypes.SET_NEW_AUCTION,
        payload: newAuction
    }
}

//להפוך סטטוס של משתמש רגיל למנהל
export const beManagerInDB = (_id) => {
    return axios.put(`http://localhost:5000/users/beManager/${_id}`)
}


//מידע על המכירה
export const saveAuctionInformation = (_id, details) => {
    return (dispatch) => {
        axios.put(`http://localhost:5000/auctions/setAuctionInformation/${_id}&${details}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }

}




