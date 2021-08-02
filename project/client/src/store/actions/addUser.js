import axios from 'axios';
import * as actionTypes from '../actionTypes';
export const addUser = (user) => {
    return {
        type: actionTypes.ADD_NEW_USER,
        payload: user
    }
}
export const addUserToDB = (user) => {
    return (dispatch) => {
        axios.post("http://localhost:5000/users", user).then(succ => {
            console.log(succ.data);
            dispatch(addUser(succ.data));
        })
    }
}