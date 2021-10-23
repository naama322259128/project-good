const express = require("express");
const route = express.Router();
const userController = require("../controllers/user");
const myEmailMessagesController = require("../controllers/email")

route.get("/", userController.getAll)
route.get("/:id", userController.getById)
route.get("/signIn/:password&:email", userController.isUserExist)
route.post("/", userController.addUser)
route.post("/beManager/:_id", userController.beManager)
route.put("/:id", userController.updateUser)
route.delete("/:id", userController.deleteUser)

route.post("/sendContactToSiteManager/", myEmailMessagesController.sendContactToSiteManager)

module.exports = route;
