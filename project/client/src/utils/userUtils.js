import axios from 'axios';

export const addUser = (user) => {
    return axios.post("http://localhost:5000/users", user)
}


export const sendContact = async (details) => {
    return axios.post(`http://localhost:5000/users/sendContactToSiteManager`, details);
}

export const getUserOrdersListFromDB = async (_id) => {
    return axios.get(`http://localhost:5000/orders/userOrdersList/${_id}`)
}

export const getProductsInCartByAuctionIdFromDB = async (userId, auctionId) => {
    return axios.get(`http://localhost:5000/users/getProductsInCartByAuctionId/${userId}&${auctionId}`)
}