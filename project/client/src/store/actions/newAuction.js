import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { updateCurrentUser } from './user'


export const showAddPackage = () => {
    return {
        type: actionTypes.SHOW_ADD_PACKAGE
    }
}
export const addPackage = (p) => {
    return {
        type: actionTypes.ADD_PACKAGE,
        payload: p
    }
}
export const deletePackage = (p) => {
    return {
        type: actionTypes.DELETE_PACKAGE,
        payload: p
    }
}
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
export const setOrganizationPhotos = (pic) => {
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
export const setProductsList = (arr) => {
    return {
        type: actionTypes.SET_PRODUCTS_LIST,
        payload: arr
    }
}
export const setPackagesList = (arr) => {
    return {
        type: actionTypes.SET_PACKAGES_LIST,
        payload: arr
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
export const deleteProduct = (p) => {
    return {
        type: actionTypes.DELETE_PRODUCT,
        payload: p
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

//להפוך סטטוס של משתמש רגיל למנהל
export const beManager = (_id) => {
    return axios.post(`http://localhost:5000/users/beManager/:${_id}`)
}
// אישור פירסום מכירה 
            
export const pubicationApproval=(a_id,status)=>{
    return axios.put(`http://localhost:5000/auctions/publicationApproval/${a_id}&${status}`)  
}

//--------------שמירת נתוני מכירה לפי שלבים

//תמחור מכירה
export const savePackages = (packages) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/auctions/setPackages/:${packages}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}
//העלאת מוצרים
export const saveProducts = (products) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/auctions/setProducts/:${products}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}
//מידע על הארגון
export const saveOrganizationInformation = (details) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/auctions/setOrganizationInformation/:${details}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}

//מידע על המכירה
export const saveAuctionInformation = (details) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/auctions/setAuctionInformation/:${details}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}