const express=require("express");
const route=express.Router();
const archivalAuctionController=require("../controllers/archivalAuction");

route.get("/",archivalAuctionController.getAll)
route.get("/:id",archivalAuctionController.getById)
route.post("/",archivalAuctionController.addArchivalAuction)
route.delete("/:id",archivalAuctionController.deleteArchivalAuction)

module.exports=route;
