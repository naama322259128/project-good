const express=require("express");
const route=express.Router();
const purchasePackageController=require("../controllers/purchasePackage");

// route.get("/",purchasePackageController.getAll)
// route.get("/:id",purchasePackageController.getById)
// route.post("/",purchasePackageController.addPurchasePackage)
// route.delete("/:id",purchasePackageController.deletePurchasePackage)

module.exports=route;
