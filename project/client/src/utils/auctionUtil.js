import * as actions from '../store/actions/newAuction';
import axios from 'axios';

export const createNewAuction = (auction) => {

  return (dispatch) => {
          axios.post(`http://localhost:5000/auctions`,auction).then(succ => {
            console.log(succ.data);
            if (succ.status != 404)
                dispatch(actions.setLastModal(false),actions.resetState());
        })
    }  
    

}
