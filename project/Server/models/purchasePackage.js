
const mongoose = require("mongoose");
const purchasePackage = new mongoose.Schema({
    code: { type: String, default:"sss"/*, required:true */},
    ticketsQuantity: { type: Number/*, required:true*/ }   ,//כמות כרטיסים
    discountPercenrages: { type: Number/*, required:true*/ }//אחוזי הנחה
});
const PurchasePackage = mongoose.model("PurchasePackage", purchasePackage);
module.exports = PurchasePackage;
//חבילות רכישה


//https://mongoosejs.com/docs/schematypes.html
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

