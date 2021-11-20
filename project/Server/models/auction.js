
const mongoose = require("mongoose");
const auctionSchema = new mongoose.Schema({
    name: String,
    auctionManager: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },//managerId
    registrationStartDate: { type: Date },   //תאריך התחלה
    lotteriesDate: Date,   //תאריך ביצוע ההגרלות
    registrationEndDate: Date,//תאריך סיום הרשמה
    status: { type: String, enum: ['DONE', 'NOT_DONE'], default: 'NOT_DONE' },
    purchasePackage: [{
        //אם מוסיפים שדה זה, הוא לא ממציא לבד אי-די, אלא נותן לנו לשלוח ערך לשדה זה
        // _id: { type: mongoose.SchemaTypes.ObjectId, required: true },
        name: String,
        ticketsQuantity: Number,//כמות כרטיסים
        discountPercenrages: Number,//אחוזי הנחה
        gifts: [String]
    }],
    productList: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Product' }],
    lotteryApproval: { type: Boolean, default: false },
    organizationName: String,
    organizationText: String,
    organizationPhotos: [String],
    terms: String,//קובץ
    publicationApproval: { type: Boolean, default: false }//אישור פרסום באתר

});
const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;