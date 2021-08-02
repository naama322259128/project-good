import * as actionTypes from '../actionTypes';
const initialState = {
    currentUser: null,
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_USER:
            return {
                ...state,
                currentUser: action.payload
            }
    }
    return state;
}
// export default userReducer;