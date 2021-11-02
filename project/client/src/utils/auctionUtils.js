import axios from 'axios';

export const getAuctionByIdFromDB = (_id) => {
  return axios.get(`http://localhost:5000/auctions/${_id}`)
}


export const getAuctionsListFromDB = async () => {
  return axios.get(`http://localhost:5000/auctions`)
}


export const getAuctionWithWinnersFromDB = async (_id) => {
  return axios.get(`http://localhost:5000/auctions/getAuctionWithWinners/${_id}`);
}

