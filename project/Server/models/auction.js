const mongoose = require("mongoose");
const PurchasePackageSchema = require("./purchasePackage").schema;
const OrderSchema = require("./order").schema;
const ProductSchema = require("./product").schema;
const auctionSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    auctionManager:{type:mongoose.SchemaTypes.ObjectId,ref:'auctionManager', required: true},//managerId
    lotteriesDate: { type: Date, required: true },//תאריך ביצוע ההגרלות
    purchasePackage: { type: [PurchasePackageSchema] },
    productList: { type: [ProductSchema] },
    orderList: { type: [OrderSchema] },
    pricingGroups:{ type: [Number], required: true },
});
const Auction = mongoose.model("auction", auctionSchema);
/*module.exports.model = auction;
module.exports.schema = auctionSchema;*/
module.exports = Auction;