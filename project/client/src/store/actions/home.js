
import * as actionTypes from '../actionTypes';
export const setLogin = (s) => {
    //s=bool האם להציג את הלוגין
    return {
        type: actionTypes.SET_LOGIN,
        payload: s
    }
}
export const setShowContactForm = (s) => {
    //s=bool האם להציג את הטופס יצירת קשר
    return {
        type: actionTypes.SET_SHOW_CONTACT_FORM,
        payload: s
    }
}