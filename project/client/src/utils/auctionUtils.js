import * as actions from '../store/actions/newAuction';
import axios from 'axios';

export const createNewAuction = (auction) => {
  return (dispatch) => {
    axios.post(`http://localhost:5000/auctions`, auction).then(succ => {
      console.log(succ.data);
      if (succ.status != 404)//אם הצליח ליצור את המכירה, ימחק את נתוניה מהסטייט
        dispatch(actions.setLastModal(false), actions.resetNewAuctionState());//?
      //ולהחזיר לדף הבית
    })
  }
}

//מחזירה את רשימת המכירות הקיימות במסד נתונים 
export const  getAuctionsList =async () => {
  return axios.get(`http://localhost:5000/auctions`)
}

export const  setCurrentAuctionItemsInLS = async() => {
  if (localStorage.getItem("currentAuction") === null) {
    localStorage.setItem("currentAuction", JSON.stringify(""));
  }
  return { type: 22 }

}