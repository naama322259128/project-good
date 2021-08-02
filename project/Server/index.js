const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const user=require("./routes/user");
const pricingGroup=require("./routes/pricingGroup");
const product=require("./routes/product");
const purchasePackage=require("./routes/purchasePackage");
const sale=require("./routes/sale");
const saleManager=require("./routes/saleManager");
const siteManager=require("./routes/siteManager");
const subscription=require("./routes/subscription");

mongoose.connect("mongodb://localhost:27017/projectDB").then(()=>{
    console.log("connected to mongoDB");    
}).catch(er=>{console.log(er)});

const app=express();
app.use(express.json());
app.use(cors());

app.use("/users",user);
app.use("/pricingGroups",pricingGroup);
app.use("/products",product);
app.use("/purchasePackages",purchasePackage);
app.use("/sales",sale);
app.use("/saleManagers",saleManager);
app.use("/siteManagers",siteManager);
app.use("/subscriptions",subscription);
app.listen(5000, () => {
    console.log("listening on port 5000")
})
