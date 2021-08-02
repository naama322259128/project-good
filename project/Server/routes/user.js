const express=require("express");
const route=express.Router();
const userController=require("../controllers/user");

route.get("/",userController.getAll)
route.get("/signIn:details",userController.isUserExsit)
route.get("/:id",userController.getById)
route.post("/",userController.addUser)
route.put("/:id",userController.updateUser)
route.delete("/:id",userController.deleteUser)


module.exports=route;
