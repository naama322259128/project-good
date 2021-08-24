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
//--------------------------------------------------------------
//הניתובים לשרת לא נכונים צריך לכתוב אותם עפ"י מ שנכתוב בשרת

//מקבלת קוד מכירה ומוצר ומוסיפה בהתאם
//נשתמש בה גם ליצירת מכירה חדשה 
//וגם להוספת מוצרים במכירה קיימת
// export const addProduct = (id, product) => {
//     return (dispatch) => {
//        let newProduct={id:id,product:product}
//         axios.post(`http://localhost:5000/auctions`,newProduct).then(succ => {
//             console.log(succ.data);
//             if (succ.status != 400)
//                 dispatch(console.log(succ.data));
//         })
//     }
// }

// מחזירה רשימת מוצרים עפ"י קוד מכירה 
// export const getProductList = (id) => {
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
