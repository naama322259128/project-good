const express = require("express");
const route = express.Router();
const auctionController = require("../controllers/auction");
route.get("/", auctionController.getAll)
route.get("/getAuctionIsApproved/:_id", auctionController.getAuctionIsApproved)
route.get("/getAuctionsByManagerId/:manager_id", auctionController.getAuctionsByManagerId)
route.get("/getAuctionIsDone/:_id", auctionController.getAuctionIsDone)
route.get("/:id", auctionController.getById)
route.post("/", auctionController.addAuction)
route.delete("/:id", auctionController.deleteAuction)
route.put("/approvalAuction/:a_id&:status", auctionController.approvalAuction)

module.exports = route;
