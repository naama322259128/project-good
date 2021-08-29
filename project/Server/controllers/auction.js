const Auction = require("../models/auction");
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
    console.log("auction-----------------------------------------------------------------------------------------------");
    console.log(auction);

    let newAuction = new Auction(auction);
    console.log("newAuction created------------------------------");
    console.log(newAuction);

    try {
        await newAuction.save();
        console.log("newAuction saved------------------------------");
        return res.send(newAuction);
    }
    catch (err) {
        console.log(err.message)
        return res.status(400).send(err.message)
    }
}

const addProduct = async (req, res) => {
    let product = req.body;
    const url1 = req.protocol + '://' + req.get('host');
    product.image=url1 + '/public/' + req.file.filename;
    try {
        var auction = await Auction.findOne({_id:req.query.id});
        console.log(auction);
        if(!auction.productList) 
            auction.productList=[];
        auction.productList.push(product);    
        await auction.save();
        return res.send(auction);
    }
    catch (err) {
        console.log(err.message)
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

//לקבל במערך את כל המכירות השייכות למנהל שנשלח
const getAuctionsByManagerId = async (req, res) => {
    let { manager_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(manager_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.find({ 'auctionManager': manager_id });
    if (!auction)
        return res.status(404).send("There is no auction with such an manager ID number");
    //if(auction==undefined)return res.send([]);
    return res.send(auction);
}

//לקבל האם המכירה מאושרת
const getAuctionIsApproved = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(a_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.find({ '_id': _id });
    if (!auction)
        return res.status(404).send("There is no auction with such an manager ID number");
    return res.send(auction.lotteryApproval);
}


//לאשר/לא לאשר מכירה
const approvalAuction = async (req, res) => {
    let { a_id } = rea.params;
    let { status } = rea.params;
    if (!mongoose.Types.ObjectId.isValid(a_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOneAndUpdate({ '_id': a_id }, { 'lotteryApproval': status })
}

//האם המכירה התבצעה
const getAuctionIsDone = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(a_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.find({ '_id': _id });
    if (!auction)
        return res.status(404).send("There is no auction with such an manager ID number");
    return res.send(auction.status);
}


module.exports = {
    getAll, getById, addProduct,addAuction, deleteAuction, getAuctionsByManagerId, getAuctionIsApproved, approvalAuction, getAuctionIsDone
}

//המכירה שש לה הכי הרבה הכנסות
//המכירה שיש בה הכי קצת....