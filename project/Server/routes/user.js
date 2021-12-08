const express = require("express");
const route = express.Router();
const userController = require("../controllers/user");
const myEmailMessagesController = require("../controllers/email")

route.get("/", userController.getAll)
route.get("/:id", userController.getById)
route.get("/signIn/:password&:email", userController.isUserExist)
route.get("/loginGoogle/:name&:email", userController.isLoginGoogle)
route.get("/getProductsInCartByAuction/:userId&:auctionId", userController.getProductsInCartByAuction)
route.get("/getCart/:userId", userController.getCart)

route.post("/sendContactToSiteManager/", myEmailMessagesController.sendContactToSiteManager)
route.post("/", userController.addUser)
route.post(`/addProductToCart/:auctionId&:userId&:productId&:cnt`, userController.addProductToCart);
route.post(`/removeProductFromCart/:auctionId&:userId&:productId&:cnt`, userController.removeProductFromCart);

route.put("/beManager/:_id", userController.beManager)
route.put("/:id", userController.updateUser)
route.put("/emptyTheCartByAuction/:auctionId&:userId", userController.emptyTheCartByAuction)

route.delete("/:id", userController.deleteUser)

module.exports = route;


//ME.find({$where: 'this.pictures.length > 0'}).sort('-created').limit(10).execFind()
