
const mongoose = require("mongoose");
const productSchema = require("../models/product").schema
const auctionSchema = new mongoose.Schema({
    //אם משנים משהו במודל
    //צריך לתקן את הפונקציה
    //getUnapprovedAuctionsByUser

    name: { type: String, default: "" },
    auctionManager: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },//managerId
    registrationStartDate: { type: Date, default: null },   //תאריך התחלה
    lotteriesDate: { type: Date, default: null },   //תאריך ביצוע ההגרלות
    registrationEndDate: { type: Date, default: null },//תאריך סיום הרשמה
    status: { type: String, enum: ['DONE', 'NOT_DONE'], default: 'NOT_DONE' },
    /*purchasePackage: [{
        //אם מוסיפים שדה זה, הוא לא ממציא לבד אי-די, אלא נותן לנו לשלוח ערך לשדה זה
        // _id: { type: mongoose.SchemaTypes.ObjectId, required: true },
        name: String,
        ticketsQuantity: Number,//כמות כרטיסים
        discountPercenrages: Number,//אחוזי הנחה
        gifts: [String]
    }],*/
    // productList: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Auction' }],
    productList: [productSchema],
    lotteryApproval: { type: Boolean, default: false },
    organizationName: { type: String, default: "" },
    organizationText: { type: String, default: "" },
    organizationPhotos: [String],
    terms: { type: String, default: "" },//כתובת לקובץ
    publicationApproval: { type: Boolean, default: false },//אישור פרסום באתר
    logo: { type: String, default: "" }
});
const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;