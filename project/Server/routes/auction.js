const express = require("express");
const route = express.Router();
const auctionController = require("../controllers/auction");
route.get("/", auctionController.getAll)
route.get("/getAuctionIsApproved/:_id", auctionController.getAuctionIsApproved)
route.get("/getAuctionsByManagerId/:manager_id", auctionController.getAuctionsByManagerId)
route.get("/getAuctionIsDone/:_id", auctionController.getAuctionIsDone)
route.get("/:id", auctionController.getById)
route.post("/setPackages/:_id&:packages", auctionController.addPackages)
route.post("/setProducts/:_id&:products", auctionController.addProducts)
route.post("/setOrganizationInformation/:_id&:details", auctionController.addOrganizationInformation)
route.post("/setAuctionInformation/:_id&:details", auctionController.addAuctionInformation)
route.delete("/:id", auctionController.deleteAuction)
route.put("/approvalAuction/:a_id&:status", auctionController.approvalAuction)
route.put("/publicationApproval/:a_id&status", auctionController.publicationApproval)

module.exports = route;