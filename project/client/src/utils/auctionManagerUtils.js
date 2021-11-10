import axios from 'axios';

//מחזירה את המכירות שלא אושרו של המשתמש שנשלח
export const getUnapprovedAuctionsByUserFromDB = (user_id) => {
    return axios.get(`http://localhost:5000/auctions/unapprovedAuctionsByUser/${user_id}`);
}