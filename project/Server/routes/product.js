const express=require("express");
const route=express.Router();
const productController=require("../controllers/product");
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');       
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

route.get("/:auctionId",productController.getAllProduct)
route.get("/",productController.getAll)
route.get("/:id",productController.getById)
route.post("/",upload.single("image"),productController.addProduct)

module.exports=route;
