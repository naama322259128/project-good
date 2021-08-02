import * as actionTypes from '../actionTypes';
const initialState = {
    currentUser: null,
    loginIsOpen:false
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                loginIsOpen:false
            }
        case actionTypes.SET_LOGIN:
            return {
                ...state,
                loginIsOpen: action.payload
            }
    }
    
    return state;
}
// export default userReducer;