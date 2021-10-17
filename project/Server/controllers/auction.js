const Auction = require("../models/auction");
const User = require("../models/user");
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
    let auction = req.body;
    let newAuction = new Auction(auction);
    try {
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
const getWinnersList = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Invalid ID number");
    let auction = await Auction.findOne({ '_id': _id });
    if (!auction) return res.status(404).send("There is no auction with such an ID number");
    let arr = [];
    //auction.productList.map(item => arr.push({ productName: item.name, winnerId: item.winnerId }));


    //אופציה א
    -await auction.productList.map(async (item) => {
        console.log("item:   " + item)
        if (item) {
            let name = "Anonymous";
            let winner = await User.findById(item.winnerId);
            if (winner) {
                if (winner.confidentiality == false) { name = await winner.userName; }
                console.log("name:   " + name)
                await arr.push({ productName: item.name, winnerName: name });
            }
        }
    })
    console.log("arr:   " + arr);
    /*
        //אופציה ב
        //הכל חוזר אנונימי
        let gg = auction.productList.map((item) => {
            console.log("item:   " + item)
            if (item) {
                let name = "Anonymous";
                let winner = User.findById(item.winnerId);
                if (winner) {
                    if (winner.confidentiality == false) { name = winner.userName; }
                    console.log("name:   " + name)
                    return { productName: item.name, winnerName: name };
                }
            }
            return;
        })
        console.log("gg:   " + gg);
    */


    //אופציה ג
    /* let gg2 = auction.productList.map(async (item) => {
            console.log("item:   " + item)
            if (item) {
                let name = "Anonymous";
                let winner = await User.findById(item.winnerId);
                if (winner) {
                    if (winner.confidentiality == false) { name = await winner.userName; }
                    console.log("name:   " + name);
                    return { productName: item.name, winnerName: name };
                }
            }
            return;
        })
        console.log("gg2:   " + gg2);
    */
    //אופציה ד
    /*var myPromise = new Promise(function (resolve, reject) {
        // resolve('promise resolved');
        resolve(

            auction.productList.map(async (item) => {
                console.log("item:   " + item)
                if (item) {
                    let name = "Anonymous";
                    let winner =await User.findById(item.winnerId);
                    if (winner) {
                        if (winner.confidentiality == false) { name = winner.userName; }
                        console.log("name:   " + name)
                        arr.push({ productName: item.name, winnerName: name });
                    }
                }
            }))
    });

    myPromise.then(function (data) {
        console.log("ss" + arr)
    }, function (error) {
        //fail
    })*/
    // return res.send(gg2);
    // return res.send(gg);
    return res.send(arr);
}


module.exports = {
    getAll, getById, addProduct, addAuction, deleteAuction, getAuctionsByManagerId, getAuctionIsApproved, approvalAuction, getAuctionIsDone, publicationApproval
    , addPackages, addProducts, addOrganizationInformation, addAuctionInformation, deleteProduct, deletePackage, getWinnersList
}

//המכירה שש לה הכי הרבה הכנסות
//המכירה שיש בה הכי קצת....


// https://www.tutorialspoint.com/mongodb-aggregation-to-sum-individual-properties-on-an-object-in-an-array-across-documents