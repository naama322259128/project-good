export default class Order {
    constructor(userId, orderDetails, paymentCode,amountToPay, auctionId, giftCodes) {
        this.userId = userId;
        this.orderDetails = orderDetails;
        this.paymentCode = paymentCode;  
        this.amountToPay = amountToPay;
        this.auctionId = auctionId;
        this.giftCodes = giftCodes;
    }
}
