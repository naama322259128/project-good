/******************************************   USER   ****************************************************/
export const ADD_NEW_USER = "ADD_NEW_USER";//הוספת משתמש חדש
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_LOGIN = "SET_LOGIN";//האם להציג את הלוגין
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"//הכנסת מוצר לסל
export const DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART"//מחיקת מוצר מסל 
export const SET_CURRENT_AUCTION = "SET_CURRENT_AUCTION";//לאתחל את מערך המוצרים, ועוד נתונים של המכירה הנוכחית
export const SET_CNT_PRODUCT_IN_CART = "SET_CNT_PRODUCT_IN_CART";//עדכון כמות מוצר מתוך הסל
export const SIGN_OUT = "SIGN_OUT"//יציאת משתמש
export const UPDATE_SHOPPING_CART = "UPDATE_SHOPPING_CART"
// export const SET_YOUR_PROFILE="SET_YOUR_PROFILE"//האם להציג את הyour profile
export const UPDATE_USER_STATE = "UPDATE_USER_STATE"
export const SET_SHOW_CONTACT_FORM = "SET_SHOW_CONTACT_FORM"
export const ADD_ORDER = "ADD_ORDER"//הוספת הזמנה לסטייט
export const SET_USER_ORDERS = "SET_USER_ORDERS"
export const SIGN_IN_OF_STATE = "SIGN_IN_OF_STATE"
export const SET_SHOPPING_CART = "SET_SHOPPING_CART"


/******************************************   NEW AUCTION   ****************************************************/
export const SET_NEW_AUCTION = "SET_NEW_AUCTION"
export const SHOW_ADD_PACKAGE = "SHOW_ADD_PACKAGE";//AddPackage להראות את הקומפוננטה 
export const ADD_PACKAGE = "ADD_PACKAGE";//
export const DELETE_PACKAGE = "DELETE_PACKAGE";//
export const DELETE_GROUP = "DELETE_GROUP";//
export const ADD_PRODUCT = "ADD_PRODUCT";
export const SHOW_ADD_PRODUCT = "SHOW_ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ADD_PIC_ORGANIZATION = "ADD_PIC_ORGANIZATION"
export const SET_ORGANIZATION_NAME = "SET_ORGANIZATION_NAME"
export const SET_ORGANIZATION_TEXT = "SET_ORGANIZATION_TEXT";
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";
export const SET_LOTERY_DATE = "SET_LOTERY_DATE";
export const SET_TERMS = "SET_TERMS"
export const SET_FINAL_STEP = "SET_FINAL_STEP"//האם להציג את המודל של אישור סיום בניית המכירה
export const RESET_NEW_AUCTION_STATE = "RESET_NEW_AUCTION_STATE"//איפוס הסטייט של מכירה חדשה לאחר בניית מכירה
export const SET_PRODUCTS_LIST = "SET_PRODUCTS_LIST"// מעדכנת את רשימת המוצרים בסטייט 
export const SET_PACKAGES_LIST = "SET_PACKAGES_LIST"// מעדכנת את רשימת החבילות בסטייט 
export const UPDATE_NEW_AUCTION_STATE = "UPDATE_NEW_AUCTION_STATE"


/******************************************   AUCTION MANGER   ****************************************************/
export const SET_DELETE_AUCTION_MODAL = "SET_DELETE_AUCTION_MODAL";//האם להציג מודל אישור מחיקת מכירה
export const SET_EDIT_AUCTION_MODAL = "SET_EDIT_AUCTION_MODAL";//האם להציג מודל אישור עריכת מכירה
export const SET_DISAPPROVAL_AUCTION_MODAL = "SET_DISAPPROVAL_AUCTION_MODAL"//האם להציג מודל אישור לא לאשר מכירה
export const SET_APPROVAL_AUCTION_MODAL = "SET_APPROVAL_AUCTION_MODAL";//האם להציג מודל אישור אישור מכירה
export const SET_SELECTED_AUCTION_TO_OPTIONS = "SET_SELECTED_AUCTION_TO_OPTIONS"//איזו מכירה תימחק/תתעדכן/תאושר
export const UPDATE_AUCTION_MANAGER_STATE = "UPDATE_AUCTION_MANAGER_STATE"
export const SET_MANAGER_AUCTIONS = "SET_MANAGER_AUCTIONS"//הגדרה בסטייט של מכירות של המנהל

/******************************************   SITE MANAGER   ****************************************************/
export const UPDATE_SITE_MANAGER_STATE = "UPDATE_SITE_MANAGER_STATE"



/******************************************   MAIN   ****************************************************/


/******************************************   CURRENT AUCTION   ****************************************************/
export const UPDATE_CURRENT_AUCTION_STATE = "UPDATE_CURRENT_AUCTION_STATE"
