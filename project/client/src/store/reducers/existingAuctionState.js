import * as actionTypes from '../actionTypes';
const initialState = {

    productsList: [
        { code: "111", name:"aaa", image: "465", description: "osjqw jrngu3i", price: 15 },
        { code: "222", name:"aaa", image: "465", description: "osjqw jrngu3i", price: 15 },
         { code: "333", name:"aaa", image: "465", description: "osjqw jrngu3i", price: 15},
        { code: "444", name:"aaa", image: "465", description: "osjqw jrngu3i", price: 15 }
    ],//רשימת מוצרים של מכירה זו

}
export const existingAuctionReducer = (state = initialState, action) => {
    switch (action.type) {
    }
    return state;
}
