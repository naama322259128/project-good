import * as actionTypes from '../actionTypes';
import axios from 'axios';

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

//--------------------------------------------------------------
//הניתובים לשרת לא נכונים צריך לכתוב אותם עפ"י מ שנכתוב בשרת

//מקבלת קוד מכירה ומוצר ומוסיפה בהתאם
//נשתמש בה גם ליצירת מכירה חדשה 
//וגם להוספת מוצרים במכירה קיימת
export const addProductToDb = (id, product) => {
    return (dispatch) => {
        let newProduct = { id: id, product: product }
        axios.post(`http://localhost:5000/auctions`, newProduct).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}

// מחזירה רשימת מוצרים עפ"י קוד מכירה 
// export const getProductListFromDb = (id) => {
//     return (dispatch) => {
//         axios.get(`http://localhost:5000/auctions/${id}`).then(succ => {
//             console.log(succ.data);
//             if (succ.status != 400)
//                 dispatch(productList(succ.data));//לעדכן את רשימת המוצרים בסטייט
//         })
//     }
// }

// export const productList=(p)=>{
//   return{
//       type:actionTypes.PRODUCT_LIST,
//       payload:p
//   }
// }
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
export const saveAuctionDetails = (auctionDetails) => {
    return {
        type: actionTypes.SAVE_AUCTION_DETAILS,
        payload: auctionDetails
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