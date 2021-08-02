const mongoose = require("mongoose");
const purchasePackage = new mongoose.Schema({
    code: { type: String, required:true },
    ticketsQuantity: { type: Number, required:true }   ,
    discountPercenrages: { type: Number, required:true }
});
const PurchasePackage = mongoose.model("PurchasePackage", purchasePackage);
module.exports = PurchasePackage;
