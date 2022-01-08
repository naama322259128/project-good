import axios from 'axios';
import * as actionTypes from '../actionTypes';
import { signInOfState } from './signUp';
import { getAuctionByIdFromDB } from '../../utils/auctionUtils';
import { setNewAuction } from '../../store/actions/newAuction';
import { signIn, loginGoogle } from '../../store/actions/signIn';
import { setCurrentAuction } from '../../store/actions/currentAuction';

export const setLogin = (s) => {
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


