const express = require("express");
const route = express.Router();
const auctionController = require("../controllers/auction");
route.get("/", auctionController.getAll)
route.get("/getAuctionIsApproved/:_id", auctionController.getAuctionIsApproved)
route.get("/getAuctionsByManagerId/:manager_id", auctionController.getAuctionsByManagerId)
route.get("/getAuctionIsDone/:_id", auctionController.getAuctionIsDone)
route.get("/:id", auctionController.getById)
route.put("/setPackages/:_id&:packages", auctionController.addPackages)
route.put("/setProducts/:_id&:products", auctionController.addProducts)
route.put("/setOrganizationInformation/:_id&:details", auctionController.addOrganizationInformation)
route.put("/setAuctionInformation/:_id&:details", auctionController.addAuctionInformation)
route.delete("/:id", auctionController.deleteAuction)
route.delete("/deletePackage/:auction_id&package_id", auctionController.deletePackage)
route.delete("/deleteProduct/:auction_id&product_id", auctionController.deleteProduct)
route.put("/approvalAuction/:a_id&:status", auctionController.approvalAuction)
route.put("/publicationApproval/:a_id&status", auctionController.publicationApproval)

module.exports = route;