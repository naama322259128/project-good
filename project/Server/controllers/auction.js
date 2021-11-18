const Auction = require("../models/auction");
const User = require("../models/user");
const Order = require("../models/order");
const mongoose = require("mongoose");
const { addUser } = require("./user");


/********************************************כללי**************************************** */
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
    // let _id = req.body;
    // console.log(req.body)

    let { manager_id } = req.params;
    try {
        let newAuction = new Auction({ auctionManager: manager_id });
        await newAuction.save();
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
    return res.send(auction);
}
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
// const addProduct = async (req, res) => {
//     let product = req.body;
//     const url1 = req.protocol + '://' + req.get('host');
//     product.image = url1 + '/public/' + req.file.filename;
//     try {
//         var auction = await Auction.findOne({ _id: req.query.id });
//         console.log(auction);
//         if (!auction.productList)
//             auction.productList = [];
//         auction.productList.push(product);
//         await auction.save();
//         return res.send(auction);
//     }
//     catch (err) {
//         console.log(err.message)
//         return res.status(400).send(err.message)
//     }
// }



//לקבל במערך את כל המכירות השייכות למנהל שנשלח


//לקבל האם ההגרלות של המכירה מאושרות

//לאשר/לא לאשר מכירה


/********************************************אישורים**************************************** */
const getAuctionIsApproved = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(a_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOne({ '_id': _id });
    if (!auction)
        return res.status(404).send("There is no auction with such an manager ID number");
    return res.send(auction.lotteryApproval);
}


/********************************************הוספת נתונים למכירה שנוצרה**************************************** */
const addOrganizationInformation = async (req, res) => {
    let { a_id } = req.params;
    let details = req.body;
    try {
        const filter = { _id: a_id };

        let doc = await Auction.findOneAndUpdate(filter, details, { new: true });
        //TODO: לשמור את התמונות
        await doc.save();
        return res.send(doc);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const addAuctionInformation = async (req, res) => {
    let { a_id } = req.params;
    let details = req.body;
    try {
        const filter = { _id: a_id };
        const update = {
            registrationStartDate: details.registrationStartDate,
            registrationEndDate: details.registrationEndDate,
            lotteriesDate: details.lotteriesDate,
            terms: details.terms,
            name: details.name,
            publicationApproval: details.publicationApproval,
            lotteryApproval: details.lotteryApproval
        }
        let doc = await Auction.findOneAndUpdate(filter, update, { new: true });

        console.log(doc)
        await doc.save();
        return res.send(doc);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const addPurchasePackage = async (req, res) => {

    let { a_id } = req.params;
    let package = req.body;
    console.log(package)
    try {
        const filter = { _id: a_id };
        const update = { $push: { purchasePackage: { ticketsQuantity: package.ticketsQuantity, discountPercenrages: package.discountPercenrages, name: package.name, gifts: package.gifts } } };

        let doc = await Auction.findOneAndUpdate(filter, update, { new: true });
        await doc.save();
        let len = doc.purchasePackage.length;
        return res.send(doc.purchasePackage[len - 1]);
    }
    catch (err) { return res.status(400).send(err.message) }
}
const addProduct = async (req, res) => {
    let product = req.body;
    let { a_id } = req.params;

    // const url1 = req.protocol + '://' + req.get('host');
    // let newProduct = new Product(product);
    // newProduct.image = url1 + '/public/' + req.file.filename;
    try {

        const filter = { _id: a_id };
        const update = {
            $push: {
                productList: {
                    name: product.name,
                    // image: product.image,
                    description: product.description,
                    price: product.price,
                    includedInPackages: product.includedInPackages
                }
            }
        };
        let doc = await Auction.findOneAndUpdate(filter, update, { new: true });

        // await doc.save();
        let len = doc.productList.length;
        return res.send(doc.productList[len - 1]);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const setApprovalAuction = async (req, res) => {
    let { a_id } = req.params;
    let { status } = req.params;
    if (!mongoose.Types.ObjectId.isValid(a_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOneAndUpdate({ '_id': a_id }, { 'lotteryApproval': status })
    if (!auction)
        return res.status(404).send("There is no auction with such an ID number");
    return res.send(auction);
}
const setApprovalLotteries = async (req, res) => {
    let { a_id } = req.params;
    let { status } = req.params;
    if (!mongoose.Types.ObjectId.isValid(a_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOneAndUpdate({ '_id': a_id }, { 'publicationApproval': status })
    if (!auction)
        return res.status(404).send("There is no auction with such an ID number");
    return res.send(auction);
}


/********************************************מחיקת נתונים ממכירה שנוצרה**************************************** */
const deleteProduct = async (req, res) => {
    let { auction_id } = req.params;
    let { product_id } = req.params;

    const filter = { _id: auction_id };
    const update = { $pull: { 'productList': { '_id': product_id } } }
    let doc = await Auction.findOneAndUpdate(filter, update, { new: true });

    await doc.save();
    return res.send(doc);
}
const deletePackage = async (req, res) => {
    let { auction_id } = req.params;
    let { package_id } = req.params;

    const filter = { _id: auction_id };
    const update = { $pull: { 'purchasePackage': { '_id': package_id } } }
    let doc = await Auction.findOneAndUpdate(filter, update, { new: true });
    await doc.save();
    return res.send(doc);
}


/********************************************מיונים סטטיסטיקות ותרשימים**************************************** */
// const sortProductsByName=async(req,res)=>{
//     let productList = await Auction.find({}).sort({""});
//     return res.send(productList);
// }






/********************************************הגרלות וזוכים**************************************** */
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

        let arr = lott.filter(l => l.productId.toString() == productId.toString());//כל הכרטיסים למוצר הזה
        // let arr = [];
        // for (var i = 0; i < arr.length; i++)
        //     if (lott[i].productId == productId)
        //         arr.push(lott[i]);

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
const getUnapprovedAuctionsByUser = async (req, res) => {
    let { _id } = req.params;//user id 
    let auctions = [];
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("Invalid ID number");
        auctions = await Auction.find({ "auctionManager": _id, "publicationApproval": 'false' });
        if (!auctions)
            return res.status(404).send("There is no auction with such an manager ID number");
    }
    catch (err) { return res.status(400).send(err.message) }
    return res.send(auctions);
}


module.exports = {
    getAll, getById, addProduct, addAuction, deleteAuction,
    getAuctionsByManagerId, getAuctionIsApproved, setApprovalAuction, getAuctionIsDone,
    addOrganizationInformation, setApprovalLotteries,
    addAuctionInformation, deleteProduct, deletePackage, getAuctionWithWinners,
    getAuctionWithWinnersForManager, performLotteries, getUnapprovedAuctionsByUser,
    addPurchasePackage
}

//המכירה שש לה הכי הרבה הכנסות
//המכירה שיש בה הכי קצת....


// https://www.tutorialspoint.com/mongodb-aggregation-to-sum-individual-properties-on-an-object-in-an-array-across-documents


