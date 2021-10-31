import axios from 'axios';
import { setLogin } from './home';
import { setCurrentUser } from './signUp';

export const signIn = (password, email) => {
    return (dispatch) => {
        return axios.get(`http://localhost:5000/users/signIn/${password}&${email}`).then(
            succ => {
                dispatch(setCurrentUser(succ.data), setLogin(false))
            });
    }
}

export const loginGoogle = (name, email) => {
    return (dispatch) => {
        return axios.get(`http://localhost:5000/users/loginGoogle/${name}&${email}`).then(succ => {
            dispatch(setCurrentUser(succ.data), setLogin(false))

        });
    }

}