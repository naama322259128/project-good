const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./routes/user");
const product=require("./routes/product");
// const purchasePackage=require("./routes/purchasePackage");
const auction = require("./routes/auction");
const order = require("./routes/order");
var multer = require('multer')

mongoose.connect("mongodb://localhost:27017/projectDB").then(() => {
    console.log("connected to mongoDB");
}).catch(er => { console.log(er) });

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/users", user);
app.use("/products",product);
// app.use("/purchasePackages",purchasePackage);
app.use("/auctions", auction);
app.use("/orders", order);

app.listen(5000, () => {
    console.log("listening on port 5000");
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
});
var upload = multer({ storage: storage }).single('file');

app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});
app.use(express.static('public')); 
app.use('/images', express.static('public'));