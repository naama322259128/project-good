export const setAuctionManagerItemsInLS = () => {
    if (localStorage.getItem("selected_auction_to_options") === null) {
        localStorage.setItem("selected_auction_to_options", "");
    }
}

export const setUserItemsInLS = () => {
    if (localStorage.getItem("currentUser") === null) {
        localStorage.setItem("currentUser", "");
        localStorage.setItem("prodactsInCart", JSON.stringify([]));
    }
}
export const setSiteManagerItemsInLS = () => {
    /* if (localStorage.getItem("") === null) {
         localStorage.setItem("", "");
     }*/
}


