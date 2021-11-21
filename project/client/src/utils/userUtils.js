import axios from 'axios';

export const addUserToDB = (user) => {
    return axios.post("http://localhost:5000/users", user)
}

//עדכון פרטי משתמש
export const updateUserInDB = (user) => {
    return axios.put(`http://localhost:5000/users/${user._id}`, user);
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

export const addProductToShoppingCartInDB = (auctionId, userId, productId, cnt) => {
    debugger;
    //מוסיף אחד לכמות שקיימת בסל מאותו מוצר
    return axios.post(`http://localhost:5000/users/addProductToCart/${auctionId}&${userId}&${productId}&${cnt}`);
}
export const deleteProductFromShoppingCartInDB = (auctionId, userId, productId) => {
    //מוריד אחד מהכמות שקיימת בסל מאותו מוצר
    return axios.post(`http://localhost:5000/users/deleteProductFromCart/${auctionId}&${userId}&${productId}`)
}

export const emptyTheBasketByAuction = (auctionId, userId) => {
    //מוחק את כל המוצרים של מכירה מתוך סל הקניות של המשתמש
    return axios.put(`http://localhost:5000/users/emptyTheBasketBuAuction/${auctionId}&${userId}`)
}

export const addOrderToDB = (order) => {
    return axios.post(`http://localhost:5000/orders`, order);
}
