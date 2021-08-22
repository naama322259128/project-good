import axios from 'axios';
import * as actionTypes from '../actionTypes';
import { setCurrentUser } from './signUp'



export const signIn = (password, email) => {
    // let details = { password:password, email:email};
    return (dispatch) => {
        axios.get(`http://localhost:5000/users/signIn/${password}&${email}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(setCurrentUser(succ.data),localStorage.setItem('currentUser', JSON.stringify(succ.data)));
        })
    }
}




