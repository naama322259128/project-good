// import {axios} from 'axios';
import * as actionTypes from '../actionTypes';
import axios from 'axios';
export const getCurrentUser = (user) => {
    return {
        type: actionTypes.GET_CURRENT_USER,
        payload: user
    }
}
export const addUser = (user) => {
    console.log("sign up");

    return (dispatch) => {
        axios.post("http://localhost:5000/users", user).then(succ => {
            console.log(user);
            console.log(succ.data);
            if (succ.status != 400) {
                dispatch(getCurrentUser(succ.data));

            }
        
        })
    }

}