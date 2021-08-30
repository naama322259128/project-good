import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { updateCurrentUser } from './user'

export const setCurrentAuction = (auctionId) => {
  return (dispatch) => {
    axios.get(`http://localhost:5000/auctions/${auctionId}`).then(succ => {
      console.log(succ.data);
      if (succ.status != 400)
        dispatch(updateCurrentAuction(succ.data), localStorage.setItem('currentAuction', JSON.stringify(succ.data)));
    })
  }
}

export const updateCurrentAuction = (auction) => {
  return {
    type: actionTypes.SET_CURRENT_AUCTION,
    payload: auction
  }
}
export const getProducts = (auction_id) => {
  //axios.
}
export const updateCurrentAuctionState = () => {
  updateCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  return {
    type: actionTypes.UPDATE_CURRENT_AUCTION_STATE,
    payload: JSON.parse(localStorage.getItem("currentAuction"))
  }
}
export const setItemsInLocalStorage = () => {
  if (localStorage.getItem("currentAuction") === null) {
    localStorage.setItem("currentAuction", "");
  }
  return {};

}
