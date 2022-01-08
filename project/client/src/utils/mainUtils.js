import axios from 'axios';

export const getTotalRevenueAllAuctionsFromDB = async () => {
  return axios.get(`http://localhost:5000/auctions/getTotalRevenueAllAuctions`)
}

export const getHighestRevenueAuctionsFromDB = async () => {
  return axios.get(`http://localhost:5000/auctions/getHighestRevenueAuctions`)
}

export const getBestSellingProductFromDB = async () => {
  return axios.get(`http://localhost:5000/auctions/getBestSellingProduct`)
}


