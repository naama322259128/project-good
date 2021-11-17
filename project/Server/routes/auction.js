const express = require("express");
const route = express.Router();
const auctionController = require("../controllers/auction");
const myEmailMessagesController = require("../controllers/email")

route.get("/", auctionController.getAll)
route.get("/getAuctionIsApproved/:_id", auctionController.getAuctionIsApproved)
route.get("/getAuctionsByManagerId/:manager_id", auctionController.getAuctionsByManagerId)
route.get("/getAuctionIsDone/:_id", auctionController.getAuctionIsDone)
route.get("/getAuctionWithWinners/:_id", auctionController.getAuctionWithWinners)
route.get("/getAuctionWithWinnersForManager/:_id", auctionController.getAuctionWithWinnersForManager)
route.get("/unapprovedAuctionsByUser/:_id", auctionController.getUnapprovedAuctionsByUser)
route.get("/:id", auctionController.getById)
route.get("/sendEmailToWinners/:_id", myEmailMessagesController.sendEmailToWinners)
route.get("/sendWinnersListToManager/:_id", myEmailMessagesController.sendWinnersListToManager)
route.get("/sendWinnersListToUsers/:_id", myEmailMessagesController.sendWinnersListToUsers)

route.put("/performLotteries/:_id", auctionController.performLotteries)


route.post("/setOrganizationInformation/:a_id", auctionController.addOrganizationInformation)
route.post("/setAuctionInformation/:a_id", auctionController.addAuctionInformation)
route.post("/approvalAuction/:a_id&:status", auctionController.setApprovalAuction)
route.post("/approvalLotteries/:a_id&:status", auctionController.setApprovalLotteries)
route.post("/addPurchasePackage/:a_id", auctionController.addPurchasePackage)
route.post("/addProduct/:a_id", auctionController.addProduct)
route.post("/createNewAuction/:manager_id", auctionController.addAuction)

route.delete("/:id", auctionController.deleteAuction)
route.delete("/deletePackage/:auction_id&:package_id", auctionController.deletePackage)
route.delete("/deleteProduct/:auction_id&:product_id", auctionController.deleteProduct)


module.exports = route;