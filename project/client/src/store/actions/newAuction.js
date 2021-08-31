import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { updateCurrentUser } from './user'


export const showAddPackage = (b) => {
    return {
        type: actionTypes.SHOW_ADD_PACKAGE,
        payload: b
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
//--------------------------------------------------------------
//הניתובים לשרת לא נכונים צריך לכתוב אותם עפ"י מ שנכתוב בשרת

//מקבלת קוד מכירה ומוצר ומוסיפה בהתאם
//נשתמש בה גם ליצירת מכירה חדשה 
//וגם להוספת מוצרים במכירה קיימת


export const addProductToDb = (id, product) => {
    return (dispatch) => {
        // let newProduct = { id: id, product: product }
        axios.post(`http://localhost:5000/product/${id}`, product).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}




export const addPackageToDb = (id, product) => {
    //סתם העתקתי
    return (dispatch) => {
        let newProduct = { id: id, product: product }
        axios.post(`http://localhost:5000/auctions`, newProduct).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
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



/*******************************************  שמירה במסד נתונים ***********************************************/
export const saveProductsInDb = (arr) => { for (var i = 0; i < arr.length; i++)addProductToDb(arr[i]); }
export const savePricingInDb = (arr) => { for (var i = 0; i < arr.length; i++)addPackageToDb(arr[i]); }
export const saveOrganizationDetailsInDb = (obj, _id) => {
    return (dispatch) => {
        //אם הביא נאלים יכנס נאלים
        //האם חוקי
        axios.post(`http://localhost:5000/auctions/setOrganizationDetails/:${obj}&:/${_id}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}
export const saveAuctionDetailsInDb = (obj, _id) => {
    return (dispatch) => {
        //אם הביא נאלים יכנס נאלים
        //האם חוקי
        axios.post(`http://localhost:5000/auctions/setAuctionDetails/:${obj}&:/${_id}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}

export const beManager = (_id) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/users/beManager/:${_id}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}


export const updateNewAuctioinState = () => {
    alert("updateNewAuctioinState");
    updateCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    let obj =
    {
        showSetPackage: localStorage.getItem("showSetPackageBtn"),
        showSetProduct: localStorage.getItem("showSetProductBtn"),
        organizationName: JSON.parse(localStorage.getItem("organizationName")),
        organizationText: JSON.parse(localStorage.getItem("organizationText")),
        organizationPhotos: JSON.parse(localStorage.getItem("organizationPhotos")),
        dateOfStart: JSON.parse(localStorage.getItem("DateOfStart")),
        dateOfEnd: JSON.parse(localStorage.getItem("DateOfEnd")),
        dateOfLotery: JSON.parse(localStorage.getItem("DateOfLotery")),
        terms: JSON.parse(localStorage.getItem("terms")),
        productsList: JSON.parse(localStorage.getItem("productsList")),
        packagesList: JSON.parse(localStorage.getItem("packagesList"))
    }
    return {
        type: actionTypes.UPDATE_NEW_AUCTION_STATE,
        payload: obj
    }
}

