import axios from 'axios';

//מחזירה את כל המכירות הקיימות במסד נתונים 
export const getAuctionsList = () => {
    return (dispatch) => {
        axios.get(`http://localhost:5000/auctions`).then(succ => {
            if (succ.status != 400)
                dispatch(console.log(succ.data));

        })
    }
}