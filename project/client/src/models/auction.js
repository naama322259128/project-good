export default class Auction {
  constructor(name,auctionManager,productList,registrationStartDate,lotteriesDate,status,
    /*purchasePackage,*/lotteryApproval,organizationName,organizationText,organizationPhotos,terms) {
    this.name = name;
    this.auctionManager = auctionManager;
    this.productList =productList;
    this.registrationStartDate = registrationStartDate;
    this.lotteriesDate = lotteriesDate;
    this.status =status;
    // this.purchasePackage =purchasePackage;
    this.productList = productList;
    this.lotteryApproval = lotteryApproval;
    this.organizationName = organizationName;
    this.organizationText =organizationText;
    this.organizationPhotos = organizationPhotos;
    this.terms = terms;
  }
}