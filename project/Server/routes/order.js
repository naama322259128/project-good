const express = require("express");
const route = express.Router();
const orderController = require("../controllers/order");

route.get("/soldMostTickets", orderController.getAuctionSoldMostTickets)
route.get("/userOrdersList/:_id", orderController.getUserOrdersList)
route.get("/", orderController.getAll)
route.get("/:id", orderController.getById)
route.get("/getOrderDetails:_id", orderController.getOrderDetails)
route.get("/:user_id&:auction_id", orderController.getOrderByToUserCodeAndAuction)
route.post("/", orderController.addOrder)
route.delete("/:id", orderController.deleteOrder)



module.exports = route;
