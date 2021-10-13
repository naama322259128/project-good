import axios from 'axios';


//להפוך סטטוס של משתמש רגיל למנהל
export const beManager = (_id) => {
    return axios.post(`http://localhost:5000/users/beManager/:${_id}`)
}
// אישור פירסום מכירה 

export const pubicationApproval = (a_id, status) => {
    return axios.put(`http://localhost:5000/auctions/publicationApproval/${a_id}&${status}`)
}

//--------------שמירת נתוני מכירה לפי שלבים

//תמחור מכירה
export const savePackages = (auction_id, packages) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/auctions/setPackages/:${auction_id}&${packages}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}
//העלאת מוצרים
export const saveProducts = (products) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/auctions/setProducts/:${products}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}
//מידע על הארגון
export const saveOrganizationInformation = (details) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/auctions/setOrganizationInformation/:${details}`).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}

//מידע על המכירה
export const saveAuctionInformation = (details) => {
    return (dispatch) => {
        axios.post(`http://localhost:5000/auctions/setAuctionInformation/`,details).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                dispatch(console.log(succ.data));
        })
    }
}