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

