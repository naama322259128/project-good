import * as actionTypes from '../actionTypes';
const initialState = {

    productsList: [
        { cnt:1,   item:    { code: "111", name:"aaa", image: "465", description: "osjqw jrngu3i", price: 15 }},
        { cnt:4,   item:    { code: "222", name:"aaa", image: "465", description: "osjqw jrngu3i", price: 15 }},
        { cnt:18,   item:    { code: "333", name:"aaa", image: "465", description: "osjqw jrngu3i", price: 15 }},
        { cnt:3,   item:    { code: "444", name:"aaa", image: "465", description: "osjqw jrngu3i", price: 15 }}
    ],//רשימת מוצרים של מכירה זו

}
export const existingAuctionReducer = (state = initialState, action) => {
    switch (action.type) {
    }
    return state;
}
