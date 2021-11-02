const Auction = require("../models/auction");
const User = require("../models/user");
const Order = require("../models/order");
const mongoose = require("mongoose");
const { addUser } = require("./user");

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
    let au = req.body;
    let newAuction = new Auction(au);
    try {
        console.log(newAuction)
        
        await newAuction.save();
        return res.send(newAuction);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

const addProduct = async (req, res) => {
    let product = req.body;
    const url1 = req.protocol + '://' + req.get('host');
    product.image = url1 + '/public/' + req.file.filename;
    try {
        var auction = await Auction.findOne({ _id: req.query.id });
        console.log(auction);
        if (!auction.productList)
            auction.productList = [];
        auction.productList.push(product);
        await auction.save();
        return res.send(auction);
    }
    catch (err) {
        console.log(err.message)
        return res.status(400).send(err.message)
    }
}

const deleteProduct = async (req, res) => {

    //לבדוק
    let { auction_id } = req.params;
    let { product_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(auction_id) && !mongoose.Types.ObjectId.isValid(product_id))
        return res.status(404).send("Invalid ID number");
    let user = await Auction.findByIdAndRemove(id);
    if (!user)
        return res.status(404).send("There is no user with such an ID number");
    console.log(user);
    return res.send(user);
}
const deletePackage = async (req, res) => {

    //לבדוק
    let { auction_id } = req.params;
    let { package_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(auction_id) && !mongoose.Types.ObjectId.isValid(package_id))
        return res.status(404).send("Invalid ID number");
    let user = await Auction.findByIdAndRemove(id);
    if (!user)
        return res.status(404).send("There is no user with such an ID number");
    console.log(user);
    return res.send(user);
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

//לקבל האם ההגרלות של המכירה מאושרות
const getAuctionIsApproved = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(a_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOne({ '_id': _id });
    if (!auction)
        return res.status(404).send("There is no auction with such an manager ID number");
    return res.send(auction.lotteryApproval);
}

//לאשר/לא לאשר מכירה
const approvalAuction = async (req, res) => {
    let { a_id } = req.params;
    let { status } = req.params;
    if (!mongoose.Types.ObjectId.isValid(a_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOneAndUpdate({ '_id': a_id }, { 'lotteryApproval': status })
}

//האם לאשר פרסום מכירה 
const publicationApproval = async (req, res) => {
    let { a_id } = req.params;
    let { status } = req.params;
    if (!mongoose.Types.ObjectId.isValid(a_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOneAndUpdate({ '_id': a_id }, { 'publicationApproval': status })
}

//האם ההגרלות בוצעו
const getAuctionIsDone = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOne({ '_id': _id });
    if (!auction)
        return res.status(404).send("There is no auction with such an manager ID number");
    return res.send(auction.status == 'DONE');
}

// const sortProductsByName=async(req,res)=>{
//     let productList = await Auction.find({}).sort({""});
//     return res.send(productList);
// }

//---------------------------שמירת תהליך הקמת מכירה

const addPackages = async (req, res) => {
    let { _id } = req.params;
    let { packages } = req.params;
    let newAuction = new Auction();
    try {

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("Invalid ID number");
        if (_id && mongoose.Types.ObjectId.isValid(_id)) {
            newAuction = await Auction.findOne({ '_id': _id });
            if (!newAuction)
                return res.status(404).send("There is no auction with such an manager ID number");
            console.log(newAuction);
        }
        newAuction.purchasePackage = packages;
        await newAuction.save();
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const addProducts = async (req, res) => {
    let { _id } = req.params;
    let { products } = req.params;
    let newAuction = new Auction();
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("Invalid ID number");
        if (_id && mongoose.Types.ObjectId.isValid(_id)) {
            newAuction = await Auction.findOne({ '_id': _id });
            if (!newAuction)
                return res.status(404).send("There is no auction with such an manager ID number");
            console.log(newAuction);
        }
        //לבדוק איך נכון להוסיף רשימת מוצרים
        products.forEach((p) => { addProduct({ p, _id }); });
        // newAuction.productList = products;
        await newAuction.save();
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const addOrganizationInformation = async (req, res) => {
    let { _id } = req.params;
    let { details } = req.params;
    let newAuction = new Auction();
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("Invalid ID number");
        if (_id && mongoose.Types.ObjectId.isValid(_id)) {
            newAuction = await Auction.findOne({ '_id': _id });
            if (!newAuction)
                return res.status(404).send("There is no auction with such an manager ID number");
            console.log(newAuction);
        }
        newAuction.organizationName = details.organizationName;
        newAuction.organizationText = details.organizationText;
        //לשמור כמו התמונות
        newAuction.organizationPhotos = details.organizationPhotos;
        await newAuction.save();
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const addAuctionInformation = async (req, res) => {
    let { _id } = req.params;
    let { details } = req.params;
    let newAuction = new Auction();
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("Invalid ID number");
        if (_id && mongoose.Types.ObjectId.isValid(_id)) {
            newAuction = await Auction.findOne({ '_id': _id });
            if (!newAuction)
                return res.status(404).send("There is no auction with such an manager ID number");
            console.log(newAuction);
        }
        newAuction.registrationStartDate = details.registrationStartDate;
        newAuction.registrationEndDate = details.registrationEndDate;
        newAuction.lotteriesDate = details.lotteriesDate;
        await newAuction.save();
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

//קבל רשימת זוכים
const getAuctionWithWinners = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOne({ '_id': _id }).populate([{ path: "productList.winnerId", select: "userName confidentiality" }]);
    if (!auction) return res.status(404).send("There is no auction with such an ID number");
    return res.send(auction);
}

//קבל רשימת זוכים מפורטת (עבור מנהל המכירה)
const getAuctionWithWinnersForManager = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOne({ '_id': _id }).
        populate([{
            path: "productList.winnerId",
            select: `userName
            confidentiality
            email
            phone
            city`
        }]);
    if (!auction) return res.status(404).send("There is no auction with such an ID number");
    return res.send(auction);
}


//בצע הגרלות
const performLotteries = async (req, res) => {
    let { _id } = req.params;//מכירה
    let auction = await Auction.findById(_id);
    if (auction.status == "DONE")
        return res.send(null);

    let orders = await Order.find({ 'auctionId': _id });//כל ההזמנות של המכירה הזו
    if (!_id) res.send("id is not exist");
    let lott = [];
    orders.map(order => {//מעבר כל כל ההזמנות
        let orders_details = order.orderDetails;//הפרטים של ההזמנה 
        let user_id = order.userId//קוד נרשם

        orders_details.map(details => {
            let qty = details.ticketsQuantity;//מספר כרטיסים
            let prodId = details.productId//קוד מוצר
            for (var i = 0; i < qty; i++)
                lott.push({ userId: user_id, productId: prodId });//הכנסה למערך כמספר הכרטיסים שקנה
        })

    })
    //ההגרלות

    let products = auction.productList;//המוצרים של המכירה הזו
    products.map(pro => {//מעבר על כל המוצרים
        productId = pro._id;//קוד מוצר

        console.log("productId" + productId);
        let arr = lott.filter(l => l.productId.toString() == productId.toString());//כל הכרטיסים למוצר הזה
        // let arr = [];
        // for (var i = 0; i < arr.length; i++)
        //     if (lott[i].productId == productId)
        //         arr.push(lott[i]);

        console.log("arr:");
        console.log(arr);
        console.log("--------------------------------------------------------------------------------");

        if (arr.length > 0) {
            let rnd = Math.floor(Math.random() * arr.length);//ההגרלה!!!
            let winnerId = arr[rnd].userId;//הזוכה
            pro.winnerId = winnerId;//רישום הזוכה
        }
    })

    auction.status = "DONE";
    await auction.save();
    res.send(auction);
}

//מחזיר את המכירות שלא אושרו לתצוגה לפי משתמש
const getAllUnapprovedAuctionsByUser = async (req, res) => {
    let { _id } = req.params;//user id
    //לוודא שמחזיר רק את הרשומות שעונות על שני התנאים
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("Invalid ID number");
        let auctions = await Auction.find({ "auctionManager": _id }, { "publicationApproval": false });
        if (!auctions)
            return res.status(404).send("There is no auction with such an manager ID number");
        console.log(auctions);
    }
    catch (err) { return res.status(400).send(err.message) }
    return res.send(auctions);
}



module.exports = {
    getAll, getById, addProduct, addAuction, deleteAuction,
    getAuctionsByManagerId, getAuctionIsApproved, approvalAuction, getAuctionIsDone, publicationApproval
    , addPackages, addProducts, addOrganizationInformation,
    addAuctionInformation, deleteProduct, deletePackage, getAuctionWithWinners,
    getAuctionWithWinnersForManager, performLotteries, getAllUnapprovedAuctionsByUser
}

//המכירה שש לה הכי הרבה הכנסות
//המכירה שיש בה הכי קצת....


// https://www.tutorialspoint.com/mongodb-aggregation-to-sum-individual-properties-on-an-object-in-an-array-across-documents