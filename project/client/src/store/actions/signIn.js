import axios from 'axios';
import * as actionTypes from '../actionTypes';
import { getCurrentUser } from './signUp'



export const signIn = (password, email) => {
    // let details = { password:password, email:email};
    return (dispatch) => {
        axios.get(`http://localhost:5000/users/signIn/${password}&${email}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(getCurrentUser(succ.data));
        })
    }
}


export const updateCurrentUser = (user) => {
    return {
        type: actionTypes.UPDATE_CURRENT_USER,
        payload: user
    }
}
export const updateUser = (user) => {
    console.log(user);

    return (dispatch) => {
        axios.put(`http://localhost:5000/users/${user._id}`, user).then(succ => {
            console.log(user);
            console.log(succ.data);
            if (succ.status != 400) {
                dispatch(updateCurrentUser(succ.data));

            }

        })
    }

}


