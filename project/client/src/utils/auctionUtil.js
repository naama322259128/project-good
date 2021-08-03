import * as actionTypes from '../store/actionTypes';
import * as actions from '../store/actions/newAuction';
import axios from 'axios';
// import {axios} from 'axios';

export const addAuction = (auction) => {
    //לבדוק אם אפשרי לגשת לסטייט מכאן

  return (dispatch) => {
          axios.post(`http://localhost:5000/auctions`,auction).then(succ => {
            console.log(succ.data);
            if (succ.status != 404)
                dispatch(actions.setLastModal(false));
            //לאפס סטייט
            
        })
    }     
}