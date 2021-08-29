import * as actionTypes from '../actionTypes';
import p1 from '../../img/pic1.png'
import p2 from '../../img/pic2.jpg'
import p3 from '../../img/pic3.png'
import p4 from '../../img/pic4.jpg'


const initialState = {
    //  רשימת המכירות באתר שלפנו ישירות מהמסד נתונים
    auctionsList: []
}
export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
    }
    return state;
}

export const allAuctions = initialState.auctionsList;