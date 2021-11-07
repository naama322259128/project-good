import axios from 'axios';

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


export const deleteProductFromDB = (a_id, product_id) => {
    return axios.delete(`http://localhost:5000/auctions/deleteProduct/${a_id}&${product_id}`)
}


//מידע על הארגון
export const saveOrganizationInformationInDB = (_id, d) => {
    return axios.put(`http://localhost:5000/auctions/setOrganizationInformation/${_id}&${d.organizationName}&${d.organizationText}&${d.organizationPhotos}`)
}

//מידע על המכירה
export const saveAuctionInformationInDB = (a_id, d) => {
    return axios.put(`http://localhost:5000/auctions/setAuctionInformation/${a_id}&${d.name}&${d.registrationStartDate}&${d.registrationEndDate}&${d.lotteriesDate}&${d.terms}`)
}
