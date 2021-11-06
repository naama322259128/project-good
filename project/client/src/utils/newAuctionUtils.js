import axios from 'axios';
import { setNewAuction } from '../store/actions/newAuction';

export const createNewAuctionInDB = (manager_id) => {
    return axios.post(`http://localhost:5000/auctions/createNewAuction/${manager_id}`)
}
export const addPackageToDB = (a_id, pa) => {
    return axios.put(`http://localhost:5000/auctions/addPurchasePackage/${a_id}&${pa.qty}&${pa.discount}&${pa.packageName}`)
}
//העלאת מוצרים
export const addProductToDB = (a_id, p) => {
    return axios.put(`http://localhost:5000/auctions/addProduct/${a_id}&${p.name}&${p.description}&${p.price}&${p.includedInPackages}`/*, p*/);
}

//מידע על הארגון
export const saveOrganizationInformationInDB = (_id, d) => {
    alert("saveOrganizationInformationInDB")
    return axios.put(`http://localhost:5000/auctions/setOrganizationInformation/${_id}&${d.organizationName}&${d.organizationText}&${d.organizationPhotos}`)
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
