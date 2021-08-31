export default class Product {
    constructor(_id, name, image, description, price, includedInPackages, winnerId, auctionId) {
        this._id = _id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
        this.includedInPackages = includedInPackages;
        this.winnerId = winnerId;
        this.auctionId = auctionId;
    }
}