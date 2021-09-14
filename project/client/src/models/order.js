export default class Order {
    constructor(userId, orderDetails, paymentCode, amountToPay, auctionId, giftCodes, orderDate) {
        this.userId = userId; //ObjectId
        this.orderDetails = orderDetails;//[{ productId: ObjectId, ticketsQuantity: Number }]
        this.paymentCode = paymentCode;//String
        this.amountToPay = amountToPay;//Number
        this.auctionId = auctionId;//ObjectId
        this.giftCodes = giftCodes;//[String]
        this.orderDate = orderDate// Date
    }
}
