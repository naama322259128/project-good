const express=require("express");
const route=express.Router();
const orderController=require("../controllers/order");


route.get("/",orderController.getAll)
route.get("/:id",orderController.getById)
route.get("/orderList/:id",orderController.getOrderListByIdUser)
route.post("/",orderController.addOrder)
route.delete("/:id",orderController.deleteOrder)

module.exports=route;
