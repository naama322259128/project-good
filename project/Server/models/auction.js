
const mongoose = require("mongoose");
const PurchasePackage = require("./purchasePackage").schema;
const OrderSchema = require("./order").schema;
const ProductSchema = require("./product").schema;
const auctionSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    auctionManager: { type: mongoose.SchemaTypes.ObjectId, ref: 'auctionManager', required: true },//managerId
    lotteriesDate: { type: Date/*, required: true */},   //תאריך ביצוע ההגרלות
    registrationEndDate: { type: Date, required: true },
    purchasePackage: { type: [PurchasePackage], required: true },
    productList: { type: [ProductSchema] , required: true },
    orderList: { type: [OrderSchema]  }
});
const Auction = mongoose.model("auction", auctionSchema);
module.exports = Auction;


