const Auction = require("../models/auction");
const User = require("../models/user");
const Order = require("../models/order");
const mongoose = require("mongoose");
const { addUser } = require("./user");
const Product = require("../models/product")

/********************************************כללי**************************************** */
const getAll = async (req, res) => {
    let auctions = await Auction.find();
    return res.send(auctions);
}

//מחזיר את המכירות שלא אושרו לתצוגה לפי משתמש
//ומוחק את המכירות שאין בהם אף תוכן
const getUnapprovedAuctionsByUser = async (req, res) => {
    let { _id } = req.params;//user id 
    let auctions = [];
    try {
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("Invalid ID number");

        //מחיקת מכירות שלו שאין בהם נתונים
        let x = await Auction.deleteMany({
            "name": "",
            "auctionManager": _id,
            "registrationStartDate": null,   //תאריך התחלה
            "lotteriesDate": null,   //תאריך ביצוע ההגרלות
            "registrationEndDate": null,//תאריך סיום הרשמה
            // "purchasePackage": { $exists: true, $size: 0 },
            "productList": { $exists: true, $size: 0 },
            "lotteryApproval": false,
            "organizationName": "",//
            "organizationText": "",//
            "organizationPhotos": { $exists: true, $size: 0 },
            "terms": "",
            "publicationApproval": false,
            "logo": ""
        });
        console.log(x);
        auctions = await Auction.find({ "auctionManager": _id, "publicationApproval": 'false', status: "NOT_DONE" });//ברור מאליו שלא בוצע 
        if (!auctions)
            return res.status(404).send("There is no auction with such an manager ID number");

    }
    catch (err) { return res.status(400).send(err.message) }
    return res.send(auctions);
}
const getpublicationApprovalAuctionsList = async (req, res) => {
    let auctions = await Auction.find({ "publicationApproval": true, "status": "NOT_DONE" });
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
    console.log("delete ", auction.organizationName)
    return res.send(auction);
}
const getAuctionsByManagerId = async (req, res) => {
    let { manager_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(manager_id))
        return res.status(404).send("Invalid ID number");

    //מחיקת מכירות שלו שאין בהם נתונים
    let x = await Auction.deleteMany({
        "name": "",
        "auctionManager": manager_id,
        "registrationStartDate": null,   //תאריך התחלה
        "lotteriesDate": null,   //תאריך ביצוע ההגרלות
        "registrationEndDate": null,//תאריך סיום הרשמה
        // "purchasePackage": { $exists: true, $size: 0 },
        "productList": { $exists: true, $size: 0 },
        "lotteryApproval": false,
        "organizationName": "",//
        "organizationText": "",//
        "organizationPhotos": { $exists: true, $size: 0 },
        "terms": "",
        "publicationApproval": false,
        "logo": ""
    });
    console.log(x);

    let auctions = await Auction.find({ 'auctionManager': manager_id });
    if (!auctions)
        return res.status(404).send("There is no auction with such an manager ID number");

    return res.send(auctions);
}


/********************************************אישורים**************************************** */
const getAuctionIsApproved = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
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
    console.log("888888888888888888888888888888888888888888")
    console.log(details)
    try {
        const filter = { _id: a_id };
        const update = {
            registrationStartDate: details.registrationStartDate,
            registrationEndDate: details.registrationEndDate,
            lotteriesDate: details.lotteriesDate,
            terms: details.terms,
            name: details.name,
            lotteryApproval: details.lotteryApproval
        }
        let doc = await Auction.findOneAndUpdate(filter, update, { new: true });

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
    try {
        let newProduct = await Product.insertMany(product);
        const filter = { _id: a_id };
        const update = { $push: { productList: newProduct } };

        console.log(newProduct);

        let doc = await Auction.findOneAndUpdate(filter, update, { new: true });
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
    console.log("a_id: " + a_id + " status: " + status)
    if (!mongoose.Types.ObjectId.isValid(a_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOneAndUpdate({ '_id': a_id }, { 'publicationApproval': status })
    if (!auction)
        return res.status(404).send("There is no auction with such an ID number");
    return res.send(auction);
}
const setApprovalLotteries = async (req, res) => {
    let { a_id } = req.params;
    let { status } = req.params;
    console.log("-------------------------------------------------------------")
    console.log(a_id)
    console.log(status)
    if (!mongoose.Types.ObjectId.isValid(a_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOneAndUpdate({ '_id': a_id }, { 'lotteryApproval': status })
    if (!auction)
        return res.status(404).send("There is no auction with such an ID number");
    console.log(auction)
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
    await Product.findOneAndDelete({ _id: product_id })

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
//הכנסות של מכירה
const getTotalRevenueOneAuction = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Invalid ID number");
    console.log(_id);
    let sum = 0;
    let orders = await Order.find({ "auctionId": _id });
    for (var i = 0; i < orders.length; i++) sum += orders[i].amountToPay;
    console.log(sum);
    return res.send(sum.toString());
}

//הכנסות של כלל המכירות
const getTotalRevenueAllAuctions = async (req, res) => {

    let a = await Order.aggregate([
        // { $match: { time: {$gte: a, $lte: tomorrow} } },//TODO האם לעשות תנאי שיסכום רק את אלו שהקוד תשלום לא נאל
        { $group: { _id: null, total: { $sum: "$amountToPay" } } }
    ])
    if (!a) return res.status(404).send("There is no orders");

    return res.send(a)
}

//מחזיר מערך של
//אם כמה מכירות באותו סכום של הכנסות, כולן תחזורנה
const getHighestRevenueAuctions = async (req, res) => {

    let auctions = await Order.aggregate(
        [
            { $group: { _id: '$auctionId', totalAmount: { $sum: "$amountToPay" } } },
            { $sort: { totalAmount: -1 } }
        ]);

    if (!auctions) return res.status(404).send("There is no orders");

    //אולי יש כמה שהגיעו לסכום הכי גבוה
    let max_auctions = [];
    for (var i = 0; i < auctions.length; i++) {
        if (auctions[i].totalAmount == auctions[0].totalAmount) {
            let n = await Auction.findById(auctions[i]._id);
            if (n)//TODO
                max_auctions.push({
                    auctionId: auctions[i]._id,
                    auctionName: n.name,
                    total: auctions[i].totalAmount,
                    logo: n.logo,
                });
        }
        else break;
    }

    return res.json(max_auctions);
}





//מוצר הכי נמכר בכל מכירה
//גם אם יש כמה מוצרים בעלי אותה כמות הזמנות, יחזור רק אחד מהם.
const getBestSellingProductByAuction = async (req, res) => {

    let { _id } = req.params;
    try {
        console.log("---------------------------------------------------------------")
        // console.log("best selling")
        // console.log('auction _id:', _id)
        let orders = await Order.find({ auctionId: _id });//כל ההזמנות
        // console.log("orders:")
        // console.log(orders)
        let tmp = [];
        orders.map(order => {
            order.orderDetails.map(ord => {
                let ind = tmp.findIndex(item => item.productId.toString() === ord.productId.toString());
                if (ind === -1) tmp.push({ productId: ord.productId, qty: parseInt(ord.ticketsQuantity), a: order.auctionId });
                else tmp[ind].qty += parseInt(ord.ticketsQuantity)
            })
        })
        // console.log("tmp:")
        // console.log(tmp)

        let maxTmp = tmp.reduce((p, c) => p.qty > c.qty ? p : c);
        // console.log("maxTmp.productId");
        // console.log(maxTmp.productId);
        let product = await Product.findById(maxTmp.productId);
        console.log("This is the best selling product:")
        console.log(product)
        console.log("The qty is: ", maxTmp.qty)

        return res.send({ product: product, qty: maxTmp.qty });
    }
    catch (err) { return res.status(400).send(err.message) }


}

//גם אם יש כמה מוצרים בעלי אותה כמות הזמנות, יחזור רק אחד מהם.
const getBestSellingProduct = async (req, res) => {

    try {
        let orders = await Order.find();//כל ההזמנות
        let tmp = [];
        orders.map(order => {
            order.orderDetails.map(ord => {
                let ind = tmp.findIndex(item => item.productId.toString() === ord.productId.toString());
                if (ind === -1) tmp.push({ productId: ord.productId, qty: parseInt(ord.ticketsQuantity), a: order.auctionId });
                else tmp[ind].qty += parseInt(ord.ticketsQuantity)
            })
        })
        console.log(tmp)

        let maxTmp = tmp.reduce((p, c) => p.qty > c.qty ? p : c);
        console.log("maxTmp.productId");
        console.log(maxTmp.productId);
        let product = await Product.findById(maxTmp.productId); console.log(product)
        let auction = await Auction.findById(maxTmp.a);

        return res.send({ product: product, qty: maxTmp.qty, auction: auction });
    }
    catch (err) { return res.status(400).send(err.message) }
}



/********************************************הגרלות וזוכים**************************************** */
//האם ההגרלות בוצעו
const getAuctionIsDone = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOne({ '_id': _id });
    if (!auction) return res.status(404).send("There is no auction with such an manager ID number");
    return res.send(auction.status == 'DONE');
}

//קבל רשימת זוכים
const getAuctionWithWinners = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOne({ '_id': _id }).populate([{ path: "productList.winnerId", select: "userName confidentiality city" }]);
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
    // if (auction.status == "DONE")
    //     return res.send(null);

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

            //TODO חשוב
            // let xxx = await Product.findOneAndUpdate({ "_id": pro._id }, { "winnerId": winnerId });
            xxx.save();
        }
        //מוצר שאין לו זוכים, יוכנס אליו קוד מנהל
        //כי אחרי זה בפונקציות אחרות זה עושה שגיאות שעושים פופולייט לפי קוד זוכה

        //TODO   אנשים יחשבו שהמנהל זכה בהרבה דברים  :(
        // else pro.winnerId = auction.auctionManager;
    })

    auction.status = "DONE";
    await auction.save();
    res.send(auction);
}


module.exports = {
    getAll, getpublicationApprovalAuctionsList, getById, addProduct, addAuction, deleteAuction,
    getAuctionsByManagerId, getAuctionIsApproved, setApprovalAuction, getAuctionIsDone,
    addOrganizationInformation, setApprovalLotteries,
    addAuctionInformation, deleteProduct, deletePackage, getAuctionWithWinners,
    getAuctionWithWinnersForManager, performLotteries, getUnapprovedAuctionsByUser,
    addPurchasePackage,
    getTotalRevenueOneAuction, getTotalRevenueAllAuctions, getHighestRevenueAuctions,
    getBestSellingProductByAuction, getBestSellingProduct
}