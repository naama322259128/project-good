
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    code: { type: String/*, required: true */},
    name: { type: String/*, required: true */},
image: { type: String/*, required: true */},
    description: { type: String/*, required: true*/ },
price:{ type: Number/*, required: true*/ },
    winnerId: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'User'
    },
    //קוד זוכה, מצביע לטבלת זוכים
    //טבלת נרשמים: קוד לקוח+כמות כרטיסים
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;

