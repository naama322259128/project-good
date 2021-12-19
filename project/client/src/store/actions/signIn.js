import axios from 'axios';
import { setLogin } from './home';
import { setCurrentUser, signInOfState } from './signUp';

export const signIn = (password, email) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/users/signIn/${password}&${email}`).then(
            succ => {
                if (succ.status != 400)
                    dispatch(signInOfState(succ.data))
                // dispatch(setCurrentUser(succ.data), setLogin(false),localStorage.setItem("user", succ.data._id)) //TODO למה לא?
            });
    }
}

export const loginGoogle = (name, email) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/users/loginGoogle/${name}&${email}`).then(succ => {
            if (succ.status != 400)
                dispatch(
                    //setCurrentUser(succ.data), setLogin(false), localStorage.setItem("isLogin", true))
                    signInOfState(succ.data),
                    localStorage.setItem("user", succ.data._id)
                )
        });
    }
}