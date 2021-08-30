
export const setNewAuctionItemsInLS = () => {
    if (localStorage.getItem("showSetProductBtn") === null) {
        localStorage.setItem("showSetProductBtn", true);
        localStorage.setItem("productsList", JSON.stringify([]));
        localStorage.setItem("showSetPackageBtn", true);
        localStorage.setItem("packagesList", JSON.stringify([]));
    }
}