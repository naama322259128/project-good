import {axios} from 'axios';
import * as actionTypes from '../actionTypes';
export const setLogin = (s) => {
    //s=bool האם להציג את הלוגין
    return {
        type: actionTypes.SET_LOGIN,
        payload: s
    }
}