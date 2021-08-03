const express=require("express");
const route=express.Router();
const productController=require("../controllers/product");
route.get("/:auctionId",productController.getAllProduct)
route.get("/",productController.getAll)
route.get("/:id",productController.getById)
route.post("/",productController.addProduct)


module.exports=route;
