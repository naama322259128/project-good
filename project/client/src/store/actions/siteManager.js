import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { updateCurrentUser } from './user'

export const updateSiteManagerState = () => {
    updateCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    //TODO:
    return {
        type: actionTypes.UPDATE_SITE_MANAGER_STATE,
        payload: ""
    }
}
