import axios from 'axios';
import { setNewAuction } from '../store/actions/newAuction';

export const createNewAuctionInDB = (manager_id) => {
    return axios.post(`http://localhost:5000/auctions/createNewAuction/${manager_id}`)
}

//מידע על הארגון
export const saveOrganizationInformationInDB = (_id, details) => {
    return (dispatch) => {
        axios.put(`http://localhost:5000/auctions/setOrganizationInformation/${_id}&${details}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data), setNewAuction(succ.data));
        })
    }
}

//מידע על המכירה
export const saveAuctionInformationInDB = (details) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/auctions/setAuctionInformation/`, details).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data), setNewAuction(succ.data));
        })
    }
}