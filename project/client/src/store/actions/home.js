import axios from 'axios';
import * as actionTypes from '../actionTypes';
import { signInOfState } from './signUp';
import { getAuctionByIdFromDB } from '../../utils/auctionUtils';
import { setNewAuction } from '../../store/actions/newAuction';
import { signIn, loginGoogle } from '../../store/actions/signIn';
import { setCurrentAuction } from '../../store/actions/currentAuction';

export const setLogin = (s) => {
    return {
        type: actionTypes.SET_LOGIN,
        payload: s
    }
}
export const setShowContactForm = (s) => {
    //s=bool האם להציג את הטופס יצירת קשר
    return {
        type: actionTypes.SET_SHOW_CONTACT_FORM,
        payload: s
    }
}
/*

export const GetDataFromStorage = () => {
    // var newAuctionId = localStorage.getItem("newAuction");
    // var currentAuctionId = localStorage.getItem("currentAuction");
    // return (dispatch) => {
    //     if (newAuctionId && newAuctionId.length > 1)
    //         axios.get(`http://localhost:5000/auctions/${newAuctionId}`).then(succ => {
    //             if (succ.status != 400) dispatch(setNewAuction(succ.data));
    //         }
    //     if (currentAuctionId && currentAuctionId.length > 1)
    //         axios.get(`http://localhost:5000/auctions/${currentAuctionId}`).then(succ => {
    //             dispatch(setCurrentAuction(succ.data))
    //         });
    // }
}

export const LoginFromStorage = () => {
    return (dispatch) => {
        if (localStorage.getItem("login") == "true")
            axios.get(`http://localhost:5000/users/signIn/${localStorage.getItem("pass")}&${localStorage.getItem("email")}`).then(succ => {
                // dispatch(setCurrentUser(succ.data), setLogin(false)) //TODO למה לא?
                dispatch(
                    signInOfState(succ.data),
                )
            });
        else if (localStorage.getItem("login") == "google")
            axios.get(`http://localhost:5000/users/loginGoogle/${localStorage.getItem("name")}&${localStorage.getItem("email")}`).then(succ => {
                dispatch(
                    //setCurrentUser(succ.data), setLogin(false), localStorage.setItem("isLogin", true))
                    signInOfState(succ.data),
                )
            });
        else null;
    }
}

// // export const LoginFromStorage = () => {
// 
// //     if (localStorage.getItem("login") == "true")
// //         return signIn(localStorage.getItem("pass"), localStorage.getItem("email"));
// //     else if (localStorage.getItem("login") == "google")
// //          return loginGoogle(localStorage.getItem("name"), localStorage.getItem("email"));
// // return null
// // }
// 
// // export const GetDataFromStorage = () => {
// //     var newAuctionId = localStorage.getItem("newAuction");
// //     var currentAuctionId = localStorage.getItem("currentAuction");
// //     if (newAuctionId && newAuctionId.length > 1)
// //         return getAuctionByIdFromDB(newAuctionId).then(succ => {
// //             if (succ.status != 400) setNewAuction(succ.data);
// //         })
// //     if (currentAuctionId && currentAuctionId.length > 1)
// //         return getAuctionByIdFromDB(currentAuctionId).then(succ => {
// //             if (succ.status != 400) setCurrentAuction(succ.data);
// //         })
// //     return null;
// // }
// 




// */

// export const LoginFromStorage = () => {
//     let user = localStorage.getItem("login")
//     if (!user) return null;
//     return (dispatch) => {
//         axios.get(`http://localhost:5000/users/signIn/${localStorage.getItem("pass")}&${localStorage.getItem("email")}`).then(succ => {
//             // dispatch(setCurrentUser(succ.data), setLogin(false)) //TODO למה לא?
//             dispatch(
//                 signInOfState(succ.data),
//             )
//         });

//         else if (localStorage.getItem("login") == "google")
//     axios.get(`http://localhost:5000/users/loginGoogle/${localStorage.getItem("name")}&${localStorage.getItem("email")}`).then(succ => {
//         dispatch(
//             //setCurrentUser(succ.data), setLogin(false), localStorage.setItem("isLogin", true))
//             signInOfState(succ.data),
//         )
//     });
// else null;
//     }
// }