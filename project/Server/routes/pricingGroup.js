const express=require("express");
const route=express.Router();
const pricingGroupController=require("../controllers/pricingGroup");

route.get("/",pricingGroupController.getAll)
route.get("/:id",pricingGroupController.getById)
route.post("/",pricingGroupController.addPricingGroup)
module.exports=route;
