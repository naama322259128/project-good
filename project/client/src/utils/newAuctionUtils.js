import axios from 'axios';

export const createNewAuctionInDB = (manager_id) => {
    return axios.post(`http://localhost:5000/auctions/createNewAuction/${manager_id}`)
}
// export const addPackageToDB = (a_id, pa) => {
//     return axios.post(`http://localhost:5000/auctions/addPurchasePackage/${a_id}`, pa)
// }

// export const deletePackageFromDB = (a_id, package_id) => {
//     return axios.delete(`http://localhost:5000/auctions/deletePackage/${a_id}&${package_id}`);
// }

//העלאת מוצרים
export const addProductToDB = (a_id, p) => {
    return axios.post(`http://localhost:5000/auctions/addProduct/${a_id}`, p);
}


export const deleteProductFromDB = (a_id, product_id) => {
    return axios.delete(`http://localhost:5000/auctions/deleteProduct/${a_id}&${product_id}`)
}

//מידע על הארגון
export const saveOrganizationInformationInDB = (_id, d) => {
    return axios.post(`http://localhost:5000/auctions/setOrganizationInformation/${_id}`, d)
}
/*      publicationApproval
        lotteryApproval
*/

//מידע על המכירה
export const savePublicationApprovalInDB = (_id, b) => {
    return axios.post(`http://localhost:5000/auctions/approvalAuction/${_id}&${b}`);
}
export const saveLotteryApprovalInDB = (_id, b) => {
    return axios.post(`http://localhost:5000/auctions/setLotteryApproval/${_id}&${b}`);
}
export const saveAuctionInformationInDB = (_id, details) => {
    return axios.post(`http://localhost:5000/auctions/setAuctionInformation/${_id}`, details);
}

export const saveApprovalAuctionInDB = (a_id, status) => {
    return axios.post(`http://localhost:5000/auctions/approvalAuction/${a_id}&${status}`);
}

export const saveApprovalLotteriesInDB = (a_id, status) => {
    return axios.post(`http://localhost:5000/auctions/approvalLotteries/${a_id}&${status}`);
}

export const addOrderToDB = (order) => {
    return axios.post(`http://localhost:5000/orders`, order);
}