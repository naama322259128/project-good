import * as actionTypes from '../actionTypes';


export const setCurrentAuction=(auctionCode)=>{
      return {
        type: actionTypes.SET_CURRENT_AUCTION,
        payload: auctionCode
    }
}

