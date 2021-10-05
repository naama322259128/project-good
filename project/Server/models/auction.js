
const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({

    name: String,
    auctionManager: { type: mongoose.SchemaTypes.ObjectId, ref: 'auctionManager', required: true },//managerId
    registrationStartDate: { type: Date, default: new Date() },   //תאריך התחלה
    lotteriesDate: Date,   //תאריך ביצוע ההגרלות
    registrationEndDate: Date,//תאריך סיום הרשמה
    status: { type: String, enum: ['DONE', 'NOT_DONE'], default: 'NOT_DONE' },
    purchasePackage: [{
        _id: mongoose.SchemaTypes.ObjectId,
        name: String,
        ticketsQuantity: Number,//כמות כרטיסים
        discountPercenrages: Number,//אחוזי הנחה
        gifts: [String]
    }],
    productList: [{
        _id: mongoose.SchemaTypes.ObjectId,
        name: String,
        image: String,
        description: String,
        price: Number,
        includedInPackages: { type: Boolean, default: true },
        winnerId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
        auctionId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Auction' },
    }],
    lotteryApproval: { type: Boolean, default: false },
    organizationName: String,
    organizationText: String,
    organizationPhotos: [String],
    terms:String,//קובץ
    publicationApproval: { type: Boolean, default: false }//אישור פירסום רק בתנאי שאישר הצגת המכירה

});
const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;


