import axios from 'axios';
import { setLogin } from './home';
import { setCurrentUser, signInOfState } from './signUp';

export const signIn = (password, email) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/users/signIn/${password}&${email}`).then(
            succ => {
                if (succ.status != 400)
                    dispatch(signInOfState(succ.data))
            });
    }
}

export const loginGoogle = (name, email) => {

    return (dispatch) => {
        axios.get(`http://localhost:5000/users/loginGoogle/${name}&${email}`).then(succ => {
            if (succ.status != 400)
                dispatch(
                    signInOfState(succ.data)                )
        });
    }
}