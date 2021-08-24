import * as actionTypes from '../actionTypes';
const initialState = {
    packagesList: [],//רשימת חבילות
    productsList: [],//רשימ מוצרים
    //showSetPrice: false,//האם להציג את קומפוננטת קביעת מחיר לקבוצה AddGroup
    showSetPackage: false,//האם להציג את קומפוננטת קביעת כמות לחבילה AddPackage
    showSetProduct: true,//האם להציג את קומפוננטת  AddProduct
    regulationsFile: null,//קובץ תקנון
    dateOfLottery: null,//תאריך ביצוע ההגרלות
    registrationEndDate: null,//תאריך סיום ההרשמה
    registrationStartDate: null,//תאריך תחילת ההרשמה
    organizationName: "",
    organizationTxt: "",
    organizationPhotos: [],
    terms:"",
    finalStepModalIsOpen: false//האם להציג את המודל של האישור הסופי
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
        // case actionTypes.PRODUCT_LIST: {
        //     let arr = [...state.productsList, action.payload];
        //     return {
        //         ...state,
        //         productsList: arr,
        //         showSetProduct: false
        //     }
        // }

        case actionTypes.DELETE_PRODUCT:
            let arr4 = state.productsList.
                filter(p => p !== action.payload);
            return {
                ...state,
                productsList: arr4,
            };
        case actionTypes.SAVE_AUCTION_DETAILS:
            return {
                ...state,
                regulationsFile: action.payload.regulations,
                dateOfLottery: action.payload.lotteryDate,
                registrationEndDate: action.payload.registrationEndDate
            };
        case actionTypes.SET_FINAL_STEP:
            return {
                ...state,
                finalStepModalIsOpen: action.payload
            }
        case actionTypes.SAVE_DATA:
            return {
                ...state,
                finalStepModalIsOpen: false
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
                regulationsFile: null,
                dateOfLottery: null,
                registrationEndDate: null,
                organizationName: "",
                organizationTxt: "",
                organizationPhotos: [],
                finalStepModalIsOpen: false,
                terms:""
            }
    }
    return state;
}
