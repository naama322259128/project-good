import * as actionTypes from '../actionTypes';
import p1 from '../../img/pic1.png'
import p2 from '../../img/pic2.jpg'
import p3 from '../../img/pic3.png'
import p4 from '../../img/pic4.jpg'


const initialState = {
    //רשימת המכירות באתר
    auctionsList: [
//כשנתחבר לסרבר לא נצטרך את מערך המוצרים כאן, כי נשלוף לפי הקוד רק למכירה שהלקוח בוחר

        {
            _id: "11", name: "Ezer Mitzion",image:p1,
            productList: [
                { _id: "111", name: "5000 Osher Ad", image: "465", description: "Ezer Mitzion wowwwwwwwww", price: 30 },
                { _id: "222", name: "aaa", image: "465", description: "Ezer Mitzion osjqw jrngu3i", price: 50 },
                { _id: "333", name: "dfs", image: "465", description: "Ezer Mitzion osjqw jrngu3i", price: 20 },
                { _id: "444", name: "aadsaa", image: "465", description: "Ezer Mitzion osjqw jrngu3i", price: 18 }]

            //,orderList: { type: [OrderSchema] },
        },


        {
            _id: "22", name: "Seminar Elkayam",image:p2,
            productList: [
                { _id: "1", name: "chair", image: "465", description: "vary good chair", price: 15 },
                { _id: "2", name: "table", image: "465", description: "table from IKEA", price: 15 },
                { _id: "3", name: "ball", image: "465", description: "blue", price: 5 },
                { _id: "4", name: "car", image: "465", description: "MITSUBISHI", price: 50 }]
        },


        {
            _id: "33", name: "Ihud Hatzala",image:p3,
            productList: [
                { _id: "11155", name: "CHEMISE 1000$", image: "465", description: "nice store", price: 14 },
                { _id: "22255", name: "aaa", image: "465", description: "osjqw jrngu3i", price: 43 },
                { _id: "33355", name: "aaa", image: "465", description: "osjqw jrngu3i", price: 5 },
                { _id: "44455", name: "aaa", image: "465", description: "osjqw jrngu3i", price: 0 }]
        },


        {
            _id: "44", name: "Od Yosef Hay",image:p4,
            productList: [
                { _id: "11187", name: "apple", image: "465", description: "Od Yosef Hay osjqw jrngu3i", price: 10 },
                { _id: "22287", name: "mango", image: "465", description: "Od Yosef Hay osjqw jrngu3i", price: 20 },
                { _id: "33387", name: "banana", image: "465", description: "Od Yosef Hay osjqw jrngu3i", price: 10 },
                { _id: "44487", name: "kiwi", image: "465", description: "Od Yosef Hay osjqw jrngu3i", price: 20 }]
        },
    ]
}
export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
    }
    return state;
}

export const allAuctions= initialState.auctionsList;