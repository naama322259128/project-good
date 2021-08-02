const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'User'
    },//קוד לקוח, מצביע לטבלת משתמשים
    productCode: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'Product'
    },//קוד מוצר, מצביע לטבלת מוצרים
    ticketsQuantity: { type: Number, required: true },
    productCode: { type: Number, required: true }

});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
