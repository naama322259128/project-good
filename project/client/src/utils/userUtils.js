import axios from 'axios';

export const addUser = (user) => {
    return (dispatch) => {
        axios.post("http://localhost:5000/users", user).then(succ => {
            console.log(user);
            console.log(succ.data);
            if (succ.status != 400) {
                dispatch(localStorage.clear(), localStorage.setItem('currentUser', JSON.stringify(succ.data)));
            }
            //הסטייט אמור להתעדכן לבד כי היה שינוי בסטורג'
        })
    }
}

export const setAuctionManagerItemsInLS = () => {
    if (localStorage.getItem("selected_auction_to_options") === null) {
        localStorage.setItem("selected_auction_to_options", JSON.stringify(""));
    }
    return { type: 22 }
}

export const setUserItemsInLS = () => {
    alert("setUserItemsInLS");
    let user = localStorage.getItem("currentUser");
    if (user === null || user === "") {
        localStorage.setItem("currentUser", JSON.stringify(""));
        localStorage.setItem("prodactsInCart", JSON.stringify([]));
    }
    return { type: 22 }
}
export const setSiteManagerItemsInLS = () => {
    /* if (localStorage.getItem("") === null) {
         localStorage.setItem("", JSON.stringify(""));
     }*/
    return { type: 22 }

}


