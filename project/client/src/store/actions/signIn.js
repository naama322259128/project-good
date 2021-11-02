import axios from 'axios';
import { setLogin } from './home';
import { setCurrentUser, signInOfState } from './signUp';

export const signIn = (password, email) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/users/signIn/${password}&${email}`).then(
            succ => {
                // dispatch(setCurrentUser(succ.data), setLogin(false)) //TODO למה לא?
                dispatch(
                    signInOfState(succ.data),
                    localStorage.setItem("login", true),
                    localStorage.setItem("pass", password),
                    localStorage.setItem("email", email)
                )
            });
    }
}

export const loginGoogle = (name, email) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/users/loginGoogle/${name}&${email}`).then(succ => {
            dispatch(
                //setCurrentUser(succ.data), setLogin(false), localStorage.setItem("isLogin", true))
                signInOfState(succ.data),
                localStorage.setItem("login", "byGoogle"),
                localStorage.setItem("name", name),
                localStorage.setItem("email", email)
            )
            //מה שיעבוד
        });
    }

}