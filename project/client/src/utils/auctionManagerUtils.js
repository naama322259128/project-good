import axios from 'axios';

//מחזירה את המכירות שלא אושרו של המשתמש שנשלח
export const getUnapprovedAuctionsByUserFromDB = async (user_id) => {
    return axios.get(`http://localhost:5000/auctions/getUnapprovedAuctionsByUser/${user_id}`);
}

export const getBestSellingProductByAuctionFromDB = async (_id) => {
    return axios.get(`http://localhost:5000/auctions/getBestSellingProductByAuction/${_id}`)
}

export const getTotalRevenueFromDB = async (_id) => {
    return axios.get(`http://localhost:5000/auctions/getTotalRevenueOneAuction/${_id}`)
}
