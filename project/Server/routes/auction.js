const express=require("express");
const route=express.Router();
const auctionController=require("../controllers/auction");
route.get("/",auctionController.getAll)
route.get("/:id",auctionController.getById)
route.post("/",auctionController.addAuction)
route.delete("/:id",auctionController.deleteAuction)

module.exports=route;
