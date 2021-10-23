const express = require("express");
const route = express.Router();
const userController = require("../controllers/user");
const myEmailMessagesController = require("../controllers/email")

<<<<<<< HEAD
route.get("/",userController.getAll)
route.get("/:id",userController.getById)
route.get("/signIn/:password&:email",userController.isUserExist)
route.post("/sendContactToSiteManager/",myEmailMessagesController.sendContactToSiteManager)
route.post("/",userController.addUser)
route.post("/beManager/:_id",userController.beManager)
route.put("/:id",userController.updateUser)
route.delete("/:id",userController.deleteUser)
=======
route.get("/", userController.getAll)
route.get("/:id", userController.getById)
route.get("/signIn/:password&:email", userController.isUserExist)
route.get("/sendContactToSiteManager/", details, myEmailMessagesController.sendContactToSiteManager)
route.post("/", userController.addUser)
route.post("/beManager/:_id", userController.beManager)
route.put("/:id", userController.updateUser)
route.delete("/:id", userController.deleteUser)
>>>>>>> 3c37befd665528f418683850edef8593269a47bb


module.exports = route;
