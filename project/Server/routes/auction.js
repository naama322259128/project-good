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

route.get("/:id", auctionController.getById)
route.put("/performLotteries/:_id", auctionController.performLotteries)
route.put("/setPackages/:_id&:packages", auctionController.addPackages)
route.put("/setProducts/:_id&:products", auctionController.addProducts)
route.put("/setOrganizationInformation/:_id&:details", auctionController.addOrganizationInformation)
route.put("/setAuctionInformation/:_id&:details", auctionController.addAuctionInformation)
route.put("/approvalAuction/:a_id&:status", auctionController.approvalAuction)
route.put("/publicationApproval/:a_id&:status", auctionController.publicationApproval)
route.post("/", auctionController.addAuction)
route.delete("/:id", auctionController.deleteAuction)
route.delete("/deletePackage/:auction_id&:package_id", auctionController.deletePackage)
route.delete("/deleteProduct/:auction_id&:product_id", auctionController.deleteProduct)

route.get("/sendEmailToWinners/:_id", myEmailMessagesController.sendEmailToWinners)
route.get("/sendWinnersList/:_id", myEmailMessagesController.sendWinnersList)

module.exports = route;