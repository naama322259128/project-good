export default class Order {
    constructor(userId, orderDetails, paymentCode, auctionId, giftCodes, orderDate) {
        this.userId = userId;
        this.orderDetails = orderDetails;
        this.paymentCode = paymentCode;
        this.auctionId = auctionId;
        this.giftCodes = giftCodes;
        this.orderDate = orderDate;
    }
}
