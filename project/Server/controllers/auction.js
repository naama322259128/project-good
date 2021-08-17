const Auction = require("../models/Auction").model;
const mongoose = require("mongoose");

const getAll = async (req, res) => {
    let auctions = await Auction.find();
    return res.send(auctions);
}

const getById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findById(id);
    if (!auction)
        return res.status(404).send("There is no auction with such an ID number");
    return res.send(auction);
}

const addAuction = async (req, res) => {
    let auction = req.body;
    console.log(auction);
    //לעדכן קוד אוטומטי
    //auction.code=
    let newAuction = new Auction(auction);
    console.log(newAuction);

    try {
        await newAuction.save();
        console.log(newAuction)
        return res.send(newAuction);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

const deleteAuction = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findByIdAndRemove(id);
    if (!auction)
        return res.status(404).send("There is no auction with such an ID number");
    console.log(auction);
    return res.send(auction);
}

//לקבל את המכירה שיש לה הכי הרבה נרשמים
const getMostSubscribers = async (req, res) => {

    //db.exhibits.aggregate( [ { $unwind: "$tags" },  { $sortByCount: "$tags" } ] )
    let sorted_arr = User.aggregate({ $sortByCount: "$password" });
    //מציג סיסמה וכמה יש מאותה סיסמה
    //מגיע ממוין
    //לקחת את האחרון
    // ? ואם כמה אחרונים באותה כמות נרשמים

    //https://docs.mongodb.com/manual/reference/operator/aggregation/sortByCount/#mongodb-pipeline-pipe.-sortByCount

    let auction = await Auction.
        if(!auction)
    return res.status(404).send("");
    console.log(auction);
    return res.send(auction);
}



module.exports = {
    getAll, getById, addAuction, deleteAuction
}

//המכירה שש לה הכי הרבה הכנסות
//המכירה שיש בה הכי קצת....