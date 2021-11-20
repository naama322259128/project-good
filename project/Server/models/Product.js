const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    includedInPackages: { type: Boolean, default: true },
    winnerId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
