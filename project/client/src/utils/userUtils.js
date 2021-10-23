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


export const getUserOrdersList = async (_id) => {
    return axios.get(`http://localhost:5000/orders/userOrdersList/${_id}`)
}
export const sendContact = async (details) => {
    debugger;
    console.log(details);
    
    return axios.post(`http://localhost:5000/users/sendContactToSiteManager`,details).then(succ => {
            debugger;

            console.log(succ.data)
        })

}