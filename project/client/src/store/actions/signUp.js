import * as actionTypes from '../actionTypes';
export const setCurrentUser = (user) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: user
    }
}
export const signInOfState = (user) => {
    return {
        type: actionTypes.SIGN_IN_OF_STATE,
        payload: user
    }
}