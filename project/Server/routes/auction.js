const express = require("express");
const route = express.Router();
const auctionController = require("../controllers/auction");
const myEmailMessagesController = require("../controllers/email")


route.get("/getpublicationApprovalAuctionsList", auctionController.getpublicationApprovalAuctionsList)
route.get("/getAuctionIsApproved/:_id", auctionController.getAuctionIsApproved)
route.get("/getAuctionsByManagerId/:manager_id", auctionController.getAuctionsByManagerId)
route.get("/getAuctionIsDone/:_id", auctionController.getAuctionIsDone)
route.get("/getAuctionWithWinners/:_id", auctionController.getAuctionWithWinners)
route.get("/getAuctionWithWinnersForManager/:_id", auctionController.getAuctionWithWinnersForManager)
route.get("/getUnapprovedAuctionsByUser/:_id", auctionController.getUnapprovedAuctionsByUser)
route.get("/sendEmailToWinners/:_id", myEmailMessagesController.sendEmailToWinners)
route.get("/sendWinnersListToManager/:_id", myEmailMessagesController.sendWinnersListToManager)
route.get("/sendWinnersListToUsers/:_id", myEmailMessagesController.sendWinnersListToUsers)

route.get("/getBestSellingProduct", auctionController.getBestSellingProduct)//מוצר עם הכי הרבה הכנסות
route.get("/getBestSellingProductByAuction/:_id", auctionController.getBestSellingProductByAuction)//מוצר עם הכי הרבה הכנסות במכירה ספציפית
route.get("/getTotalRevenueOneAuction/:_id", auctionController.getTotalRevenueOneAuction)//סך הכנסות ממכירה ספציפית
route.get("/getTotalRevenueAllAuctions", auctionController.getTotalRevenueAllAuctions)//סך הכנסות מכלל המכירות
route.get("/getHighestRevenueAuctions", auctionController.getHighestRevenueAuctions)//מכירה בעלת הכי הרבה הכנסות

route.get("/:id", auctionController.getById)
route.get("/", auctionController.getAll)


route.put("/performLotteries/:_id", auctionController.performLotteries)



route.post("/setOrganizationInformation/:a_id", auctionController.addOrganizationInformation)
route.post("/setAuctionInformation/:a_id", auctionController.addAuctionInformation)
route.post("/approvalAuction/:a_id&:status", auctionController.setApprovalAuction)
route.post("/approvalLotteries/:a_id&:status", auctionController.setApprovalLotteries)
// route.post("/addPurchasePackage/:a_id", auctionController.addPurchasePackage)
route.post("/addProduct/:a_id", auctionController.addProduct)
route.post("/createNewAuction/:manager_id", auctionController.addAuction)

route.delete("/:id", auctionController.deleteAuction)
// route.delete("/deletePackage/:auction_id&:package_id", auctionController.deletePackage)
route.delete("/deleteProduct/:auction_id&:product_id", auctionController.deleteProduct)


module.exports = route;

    //TODO   אנשים יחשבו שהמנהל זכה בהרבה דברים  :(
        // else pro.winnerId = auction.auctionManager;