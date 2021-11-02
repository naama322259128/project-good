import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { setCurrentUser } from './user';
import { getManagerAuctionsFromDB } from './auctionManager';
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
export const deletePackage = (p_id) => {
    return {
        type: actionTypes.DELETE_PACKAGE,
        payload: p_id
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
// export const setProductsList = (arr) => {
//     return {
//         type: actionTypes.SET_PRODUCTS_LIST,
//         payload: arr
//     }
// }
// export const setPackagesList = (arr) => {
//     return {
//         type: actionTypes.SET_PACKAGES_LIST,
//         payload: arr
//     }
// }
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
    debugger;
    console.log(newAuction)
    return {
        type: actionTypes.SET_NEW_AUCTION,
        payload: newAuction
    }
}

//להפוך סטטוס של משתמש רגיל למנהל
export const beManagerInDB = (_id) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/users/beManager`, _id).then(succ => {
            if (succ.status != 400) setCurrentUser(succ.data);
            //TODO לבדוק שבאמת מחזיר א תהמשתמש
        });
    }
}

// אישור פירסום מכירה            
export const pubicationApprovalInDB = (a_id, status, managerId) => {
    return (dispatch) => {
        axios.put(`http://localhost:5000/auctions/publicationApproval/${a_id}&${status}`).then(
            succ => {
                dispatch(getManagerAuctionsFromDB(managerId))
            }
        )
    }
}

//תמחור מכירה
export const addPackageToDB = (_id, pa) => {
    debugger;
    return (dispatch) => {
        axios.put(`http://localhost:5000/auctions/setPackages/${_id}&${pa}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data), addPackage(succ.data));
        })
    }
}

//העלאת מוצרים
export const addProductToDB = (a_id, product) => {
    return (dispatch) => {
        axios.put(`http://localhost:5000/auctions/setProducts/${a_id}&${product}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data), addProduct(succ.data));
        })
    }
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

export const deletePackageFromDB = (a_id, package_id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:5000/auction/deletePackage/${a_id}&${package_id}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400) {
                dispatch(console.log(succ.data), deletePackage(package_id));
            }
        })
    }

}

export const deleteProductFromDB = (_id, product_id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:5000/auction/deleteProduct/${_id}&${product_id}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400) {
                dispatch(console.log(succ.data), deleteProduct(product_id));
            }
        })
    }
}


//מחזירה את המכירות שלא אושרו של המשתמש שנשלח
export const getAllUnapprovedAuctionsByUserFromDB = (user_id) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/auctions/getAllUnapprovedAuctionsByUser/${user_id}`);
    }
}

