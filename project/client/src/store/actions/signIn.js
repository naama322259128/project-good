import axios from 'axios';
import * as actionTypes from '../actionTypes';
import { setCurrentUser} from './signUp'

export const signIn = (password, email) => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/users/signIn/${password}&${email}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400) {
                let tmp = JSON.parse(localStorage.getItem('user'));
                tmp['currentUser'] = succ.data;//לא יהיה נאל כי יוזר כבר נוצר בקומפוננטת לוגין
                localStorage.setItem("user", JSON.stringify(tmp));//הגדרת המשתמש הנוכחי בלוקל-סטורג
                dispatch(setCurrentUser(succ.data),);//הגדרת המשמש הנוכחי בסטייט
            }
        })
    }
}