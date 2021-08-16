import * as actionTypes from '../actionTypes';

export const addGroup = (qty) => {
    return {
        type: actionTypes.ADD_GROUP,
        payload: qty
    }
}
export const showAddPackage = () => {
    return {
        type: actionTypes.SHOW_ADD_PACKAGE
    }
}
export const showAddGroup = () => {
    return {
        type: actionTypes.SHOW_ADD_GROUP
    }
}
export const addPackage = (p) => {
    return {
        type: actionTypes.ADD_PACKAGE,
        payload: p
    }
}
export const deleteGroup = (p) => {
    return {
        type: actionTypes.DELETE_GROUP,
        payload: p
    }
}
export const deletePackage = (p) => {
    return {
        type: actionTypes.DELETE_PACKAGE,
        payload: p
    }
}

export const addProduct = (p) => {
    return {
        type: actionTypes.ADD_PRODUCT,
        payload: p
    }
}
export const showAddProduct = () => {
    return {
        type: actionTypes.SHOW_ADD_PRODUCT,
    }
}
export const deleteProduct = (p) => {
    return {
        type: actionTypes.DELETE_PRODUCT,
        payload: p
    }
}
export const saveAuctionDetails = (auctionDetails) => {
    return {
        type: actionTypes.SAVE_AUCTION_DETAILS,
        payload: auctionDetails
    }
}
export const saveOrganizationDetails = (name) => {
    return {
        type: actionTypes.SAVE_ORGANIZATION_DETAILS,
        payload: name
    }
}
export const setLastModal=(b)=>{
    console.log("bbb: "+b);
    
     return {
        type: actionTypes.SET_FINAL_STEP,
        payload: b
    }
}
export const  resetState= () => {
    return {
        type: actionTypes.RESET_STATE
    }
}
