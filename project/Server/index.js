const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./routes/user");
// const product=require("./routes/product");
// const purchasePackage=require("./routes/purchasePackage");
const auction = require("./routes/auction");
const order = require("./routes/order");


mongoose.connect("mongodb://localhost:27017/projectDB").then(() => {
    console.log("connected to mongoDB");
}).catch(er => { console.log(er) });

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/users", user);
// app.use("/products",product);
// app.use("/purchasePackages",purchasePackage);
app.use("/auctions", auction);
app.use("/orders", order);

app.listen(5000, () => {
    console.log("listening on port 5000");
})
