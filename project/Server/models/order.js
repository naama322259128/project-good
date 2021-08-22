const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'User'
    },//קוד לקוח, מצביע לטבלת משתמשים
    orderDetails: [{
        productId: {
            type: mongoose.SchemaTypes.ObjectId, ref: 'Product'
        },//קוד מוצר, מצביע לטבלת מוצרים
        ticketsQuantity: { type: Number, required: true }
    }],
    paymentCode: { type: String, required: true },
    amountToPay: { type: Number, required: true },
    auctionId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Auction',
        required: true
    },
    giftCodes: [String],
    orderDate: { type: Date, default: new Date() }
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;