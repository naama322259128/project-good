import * as actionTypes from '../actionTypes';
const initialState = {
    packagesList: [],//רשימת חבילות
    productsList: [],//רשימ מוצרים
    showSetPackage: false,//האם להציג את קומפוננטת קביעת כמות לחבילה AddPackage
    showSetProduct: true,//האם להציג את קומפוננטת  AddProduct
    dateOfLottery: null,//תאריך ביצוע ההגרלות
    registrationEndDate: null,//תאריך סיום ההרשמה
    registrationStartDate: null,//תאריך תחילת ההרשמה
    organizationName: "",
    organizationTxt: "",
    organizationPhotos: [],
    terms: "",
    finalStepModalIsOpen: true//האם להציג את המודל של האישור הסופי
}
export const newAuctionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_ADD_PACKAGE: {
            return {
                ...state,
                showSetPackage: true
            }
        }
        case actionTypes.ADD_PACKAGE: {
            //כבר נבדק שלא הוכנה חבילה עם מספר כרטיסים כזה
            let arr = [...state.packagesList, action.payload];
            return {
                ...state,
                packagesList: arr,
                showSetPackage: false
            }
        }
        case actionTypes.DELETE_PACKAGE:
            let arr2 = state.packagesList.
                filter(p => p.qty !== action.payload.qty);
            return {
                ...state,
                packagesList: arr2,
            };
        case actionTypes.SET_ORGANIZATION_NAME:
            return {
                ...state,
                organizationName: action.payload
            }
        case actionTypes.SET_ORGANIZATION_TEXT:
            return {
                ...state,
                organizationTxt: action.payload
            }
        case actionTypes.ADD_PIC_ORGANIZATION:
            let arrrr = [...state.organizationPhotos, action.payload];
            return {
                ...state,
                organizationPhotos: arrrr
            }
        case actionTypes.SET_TERMS:
            return {
                ...state,
                terms: action.payload
            }
        case actionTypes.SET_START_DATE:
            return {
                ...state,
                registrationStartDate: action.payload
            }
        case actionTypes.SET_END_DATE:
            return {
                ...state,
                registrationEndDate: action.payload
            }
        case actionTypes.SET_LOTERY_DATE:
            return {
                ...state,
                dateOfLottery: action.payload
            }
        case actionTypes.SHOW_ADD_PRODUCT: {
            return {
                ...state,
                showSetProduct: true
            }
        }
        case actionTypes.ADD_PRODUCT: {
            let arr = [...state.productsList, action.payload];
            return {
                ...state,
                productsList: arr,
                showSetProduct: false
            }
        }
        //מעדכן את רשימת מוצרים
        case actionTypes.SET_PRODUCTS_LIST: {
            return {
                ...state,
                productsList: action.payload,
            }
        }
        //מעדכן את רשימת החבילות
        case actionTypes.SET_PACKAGES_LIST: {
            return {
                ...state,
                packagesList: action.payload,
            }
        }
        case actionTypes.DELETE_PRODUCT:
            let arr4 = state.productsList.
                filter(p => p !== action.payload);
            return {
                ...state,
                productsList: arr4,
            };
        case actionTypes.SET_FINAL_STEP:
            return {
                ...state,
                finalStepModalIsOpen: action.payload
            }
        case actionTypes.UPDATE_NEW_AUCTION_STATE:
            return {
                ...state,
                packagesList: action.payload.packagesList,
                productsList: action.payload.productsList,
                showSetPackage: action.payload.showSetPackage,
                showSetProduct: action.payload.showSetProduct,
                dateOfLottery: action.payload.dateOfLotery,
                registrationEndDate: action.payload.dateOfEnd,
                registrationStartDate: action.payload.dateOfStart,
                organizationName: action.payload.organizationName,
                organizationTxt: action.payload.organizationText,
                organizationPhotos: action.payload.organizationPhotos,
                terms: action.payload.terms,
            }
        case actionTypes.RESET_NEW_AUCTION_STATE:
            //איפוס הסטייט לאחר בניית מכירה
            return {
                //pricesList: [],
                packagesList: [],
                productsList: [],
                //showSetPrice: false,
                showSetPackage: false,
                showSetProduct: true,
                dateOfLottery: null,
                registrationEndDate: null,
                organizationName: "",
                organizationTxt: "",
                organizationPhotos: [],
                finalStepModalIsOpen: true,
                terms: ""
            }
    }
    return state;
}
