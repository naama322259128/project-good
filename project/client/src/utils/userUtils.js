import axios from 'axios';
import { setCurrentUser } from '../store/actions/signUp'

export const addUser = (user) => {
    return (dispatch) => {
        axios.post("http://localhost:5000/users", user).then(succ => {
            if (succ.status != 400) {
                //     let tmp = JSON.parse(localStorage.getItem('user'));
                //     tmp['currentUser'] = succ.data;//לא יהיה נאל כי יוזר כבר נוצר בקומפוננטת הום-הידר
                //     localStorage.setItem("user", JSON.stringify(tmp));//הגדרת המשתמש הנוכחי בלוקל-סטורג
                dispatch(setCurrentUser(succ.data));//הגדרת המשמש הנוכחי בסטייט
            }
        })
    }
}

/*
export const setAuctionManagerItemsInLS = () => {
    if (localStorage.getItem("selected_auction_to_options") === null) {
        localStorage.setItem("selected_auction_to_options", JSON.stringify(""));
    }
    return { type: 22 }
}
export const setUserItemsInLS = () => {
    //alert("setUserItemsInLS");
    let user = localStorage.getItem("currentUser");
    if (user === null || user === "") {
        localStorage.setItem("currentUser", JSON.stringify(""));
        localStorage.setItem("prodactsInCart", JSON.stringify([]));
    }
    return { type: 22 }
}
export const setSiteManagerItemsInLS = () => {
    // if (localStorage.getItem("") === null) {
     //    localStorage.setItem("", JSON.stringify(""));
     //}
    return { type: 22 }

}
*/

