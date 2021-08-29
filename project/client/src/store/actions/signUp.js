// import {axios} from 'axios';
import * as actionTypes from '../actionTypes';
import axios from 'axios';
export const setCurrentUser = (user) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: user
    }
}

// //אלוי נעביר את זה ליוטילס
export const addUser = (user) => {
    return (dispatch) => {
        axios.post("http://localhost:5000/users", user).then(succ => {
            console.log(user);
            console.log(succ.data);
            if (succ.status != 400) {
                dispatch(/*localStorage.clear();*/localStorage.setItem('currentUser', succ.data));
                // dispatch(setCurrentUser(succ.data),localStorage.setItem('currentUser', JSON.stringify(succ.data)));
            }

        })
    }
}

/*export const signOut = () => {
    return {
        type: actionTypes.SIGN_OUT
    }
}*/
// export const deleteUser = (user) => {

//     return (dispatch) => {
//         axios.delete(`http://localhost:5000/users/${user._id}`).then(succ => {
//             console.log(user);
//             console.log(succ.data);
//             if (succ.status != 400) {
//                 dispatch(deleteCurrentUser(succ.data));

//             }

//         })
//     }

// }

