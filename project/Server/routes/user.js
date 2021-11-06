const express = require("express");
const route = express.Router();
const userController = require("../controllers/user");
const myEmailMessagesController = require("../controllers/email")

route.get("/", userController.getAll)
route.get("/:id", userController.getById)
route.get("/signIn/:password&:email", userController.isUserExist)
route.get("/loginGoogle/:name&:email", userController.isLoginGoogle)
route.post("/sendContactToSiteManager/", myEmailMessagesController.sendContactToSiteManager)
route.post("/", userController.addUser)

route.put("/beManager/:_id", userController.beManager)
route.put("/:id", userController.updateUser)

route.delete("/:id", userController.deleteUser)

module.exports = route;
