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
    paymentCode: { type: String, required: true },//קוד תשלום
    amountToPay: { type: Number, required: true },// סכום לתשלום
    auctionId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Auction',
        required: true
    },
    giftCode: [String],
    orderDate: { type: Date, default: new Date() }
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
