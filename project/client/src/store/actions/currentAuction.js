import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const setCurrentAuction = (auctionId) => {

  return (dispatch) => {
    axios.get(`http://localhost:5000/auctions/${auctionId}`).then(succ => {
      console.log(succ.data);
      if (succ.status != 400)
        dispatch(updateCurrentAuction(succ.data), localStorage.setItem('currentAuction',JSON.stringify(succ.data)));
    })
  }
}

export const updateCurrentAuction = (auction) => {
  return {
    type: actionTypes.SET_CURRENT_AUCTION,
    payload: auction
  }
}
export const getProducts=(auction_id)=>{
  //axios.
}