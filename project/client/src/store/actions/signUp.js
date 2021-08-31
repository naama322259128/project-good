// import {axios} from 'axios';
import * as actionTypes from '../actionTypes';
import axios from 'axios';
export const setCurrentUser = (user) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: user
    }
}

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

