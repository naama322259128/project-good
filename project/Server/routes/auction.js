const express = require("express");
const route = express.Router();
const auctionController = require("../controllers/auction");
route.get("/", auctionController.getAll)
route.get("/getAuctionIsApproved/:_id", auctionController.getAuctionIsApproved)
route.get("/getAuctionsByManagerId/:manager_id", auctionController.getAuctionsByManagerId)
route.get("/getAuctionIsDone/:_id", auctionController.getAuctionIsDone)
route.get("/:id", auctionController.getById)
route.post("/setPackages/:packages", auctionController.addPackages)
route.post("/setProducts/:products", auctionController.addProducts)
route.post("/setOrganizationInformation/:details", auctionController.addOrganizationInformation)
route.post("/setAuctionInformation/:details", auctionController.addAuctionInformation)
route.delete("/:id", auctionController.deleteAuction)
route.put("/approvalAuction/:a_id&:status", auctionController.approvalAuction)
route.put("/publicationApproval/:id&status", auctionController.publicationApproval)

module.exports = route;