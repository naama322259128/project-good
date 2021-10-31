import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { updateCurrentUser } from './user'
import { setProductsList } from './newAuction';

export const getAuctionFromDB = (auctionId) => {
  return (dispatch) => {
    axios.get(`http://localhost:5000/auctions/${auctionId}`).then(succ => {
      console.log(succ.data);
      if (succ.status != 400)
        dispatch(setCurrentAuction(succ.data));
    })
  }
}
export const setCntOfProductInCart = (_id, cnt) => {
  return {
    type: actionTypes.SET_CNT_PRODUCT_IN_CART,
    payload: {
      _id: _id,
      cnt: cnt
    }
  }
}
export const setCurrentAuction = (auction) => {
  return {
    type: actionTypes.SET_CURRENT_AUCTION,
    payload: auction
  }
}

