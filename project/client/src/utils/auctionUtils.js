import axios from 'axios';

export const getAuctionByIdFromDB = async(_id) => {
  return axios.get(`http://localhost:5000/auctions/${_id}`)
}


export const getpublicationApprovalAuctionsListFromDB = async () => {
  return axios.get(`http://localhost:5000/auctions/getpublicationApprovalAuctionsList/`)
}


export const getAuctionWithWinnersFromDB = async (_id) => {
  return axios.get(`http://localhost:5000/auctions/getAuctionWithWinners/${_id}`);
}

export const deleteAuctionFromDB = async (_id) => {
  return axios.delete(`http://localhost:5000/auctions/${_id}`);
}