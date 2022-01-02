const User = require("../models/user");

const mongoose = require("mongoose");
const Auction = require("../models/auction");
const getAll = async (req, res) => {
    let users = await User.find();
    return res.send(users);
}

const getById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let user = await User.findById(id);
    if (!user)
        return res.status(404).send("There is no user with such an ID number");
    return res.send(user);
}

// האם קיים משתמש בעל מייל כזה
const isEmailExist = async (em) => {
    let user = await User.find({ 'email': em });
    if (user.length == 0) { return false; }
    else { return true; }
}
//הוספת משתמש
const addUser = async (req, res) => {

    let user = req.body;
    if (await isEmailExist(user.email) == true) return res.send("This email is exist");
    else {
        let newUser = new User(user);
        try {
            await newUser.save();
            return res.send(newUser);
        }
        catch (err) {
            return res.status(400).send(err.message)
        }
    }
}

//עדכון משתמש
const updateUser = async (req, res) => {
    let userBody = req.body;
    let { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let user = await User.findById(id);
    if (!user)
        return res.status(404).send("There is no user with such an ID number");
    user.email = userBody.email || user.email;
    user.userName = userBody.userName || user.userName;
    user.phone = userBody.phone || user.phone;
    user.password = userBody.password || user.password;
    user.city = userBody.city || user.city;
    user.birthYear = userBody.birthYear || user.birthYear;
    user.confidentiality = userBody.confidentiality || user.confidentiality;//TODO

    await user.save();
    return res.send(user);
}

const updateUserStatus = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let user = await User.findById(id);
    if (!user)
        return res.status(404).send("There is no user with such an ID number");
    user.status = req.params.status;
    await user.save();
    return res.send(user);
}
//מחיקת משתמש
const deleteUser = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let user = await User.findByIdAndRemove(id);
    if (!user)
        return res.status(404).send("There is no user with such an ID number");
    return res.send(user);
}

//signIn
//בודקת האם משתמש קיים לפי סיסמא ומייל
const isUserExist = async (req, res) => {
    let { password, email } = req.params;
    let user = await User.findOne({ "password": password, "email": email });
    if (!user)
        return res.status(400).send("Incorrect details entered");
    let arr = await Auction.find({ 'auctionManager': user._id })
    if (arr && arr.length > 0) {
        user = await User.findOneAndUpdate({ _id: user._id }, { status: 'AUCTION_MANAGER' });
        user.save();
    }
    return res.send(user);
}

//האם משתמש קיים לפי שם וסיסמא 
const isLoginGoogle = async (req, res) => {
    let { name, email } = req.params;
    let user = await User.findOne({ "email": email });
    if (!user) {
        user = { "userName": name, "email": email };
        let newUser = new User(user);
        try {
            await newUser.save();
            return res.send(newUser);
        }
        catch (err) {
            return res.status(400).send(err.message)
        }
    }
    return res.send(user);
}

const beManager = async (req, res) => {
    let userId = req.params._id;
    let filter = { _id: userId };
    let update = { status: 'AUCTION_MANAGER' };


    let doc = await User.findOneAndUpdate(filter, update, {
        returnOriginal: false
    });

    if (!doc)
        return res.status(400).send("Incorrect details entered");
    return res.send(doc);
}

const addProductToCart = async (req, res) => {
    let { auctionId } = req.params;
    let { productId } = req.params;
    let { userId } = req.params;
    let { cnt } = req.params;//כמה להוסיף

    let user = await User.findById(userId);
    if (!mongoose.Types.ObjectId.isValid(userId))
        return res.status(404).send("Invalid ID number");
    if (!user)
        return res.status(404).send("There is no user with such an ID number");

    let tmp = user.shoppingCart
    console.log(tmp)
    let obj = tmp.find(x => x.productId.toString() === productId.toString());
    let index = tmp.indexOf(obj);
    if (index == -1) tmp.push({ productId: productId, qty: cnt, auctionId: auctionId })
    else tmp.fill(obj.qty += parseInt(cnt), index, index++);
    user.shoppingCart = tmp;
    await user.save();

    let user2 = await User.findById(userId).populate([
        { path: "shoppingCart.productId", select: `name image description price` }]);
    // { path: "shoppingCart.productId", select: `name image description price includedInPackages` }]);

    if (!user2)
        return res.status(404).send("There is no user with such an ID number");

    let arr = user2.shoppingCart.filter(obj => obj.auctionId.toString() == auctionId.toString());

    return res.send(arr);
}

const removeProductFromCart = async (req, res) => {
    let { auctionId } = req.params;
    let { productId } = req.params;
    let { userId } = req.params;
    let { cnt } = req.params;//כמה להוריד
    let user = await User.findById(userId);
    let tmp = user.shoppingCart

    let obj = tmp.find(x => x.productId.toString() === productId.toString());
    let index = tmp.indexOf(obj);
    if (index > -1) {
        if (obj.qty - parseInt(cnt) < 1) tmp.splice(index, 1);//אם הכמות שנותרה היא פחות אחד, למחוק אותו מהסל
        else tmp.fill(obj.qty -= parseInt(cnt), index, index++);//אחרת, להפחית מהכמות שבסל
        user.shoppingCart = tmp;
        await user.save();
    }
    let user2 = await User.findById(userId).populate([
        { path: "shoppingCart.productId", select: `name image description price` }]);
    // { path: "shoppingCart.productId", select: `name image description price includedInPackages` }]);

    // if (!user2)
    let arr = user2.shoppingCart.filter(obj => obj.auctionId.toString() == auctionId.toString());

    return res.send(arr);
}

const emptyTheCartByAuction = async (req, res) => {
    let { auctionId } = req.params;
    let { userId } = req.params;

    let user = await User.findById(userId);
    let cart = user.shoppingCart;
    if (cart) {
        let arr = cart.filter(l => l.auctionId.toString() != auctionId.toString());//כל הכרטיסים למוצר הזה
        user.shoppingCart = arr;
        await user.save();
    }
    let user2 = await User.findById(userId).populate([
        { path: "shoppingCart.productId", select: `name image description price` }]);
    // { path: "shoppingCart.productId", select: `name image description price includedInPackages` }]);

    // if (!user2)
    let arr = user2.shoppingCart.filter(obj => obj.auctionId.toString() == auctionId.toString());

    return res.send(arr);
}

const getProductsInCartByAuction = async (req, res) => {
    let { userId } = req.params;
    let { auctionId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(auctionId))
        return res.status(404).send("Invalid ID number");

    let user = await User.findById(userId).populate([
        { path: "shoppingCart.productId", select: `name image description price includedInPackages` }]);

    // if (!user)
    let arr = user.shoppingCart.filter(obj => obj.auctionId.toString() == auctionId.toString());
    console.log("arr in getProductsInCartByAuction");
    console.log(arr);

    return res.send(arr);
}
const getCart = async (req, res) => {
    let { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(userId))
        return res.status(404).send("Invalid ID number");



    let user = await User.findById(userId).populate([
        { path: "shoppingCart.productId", select: `name image description price` },
        // { path: "shoppingCart.productId", select: `name image description price includedInPackages` },
        "shoppingCart.auctionId"
    ]);
    if (!user) return res.send(null);


    //מחיקת כל המוצרים שבסל, אם התאריך האחורן להרשמה של המכירה לה הם שייכים, כבר עבר
    let arr = user.shoppingCart.filter(item => item.auctionId.registrationEndDate === null || new Date(item.auctionId.registrationEndDate).valueOf() > new Date().valueOf())
    user.shoppingCart = arr;
    await user.save();




    let tmp = user.shoppingCart;

    //רשימה יחודית של קודי מכירות מהסל
    let uniq = tmp.map(item => item.auctionId._id).filter((value, index, self) => self.indexOf(value) === index);
    let toReturn = [];

    uniq.map(item => {
        let productsByAuction = tmp.filter(l => l.auctionId._id.toString() == item.toString());//כל המוצרים בסל ששיכים למכירה הזו
        let sum = 0;
        productsByAuction.map(item => { if (item.productId != null) sum += (parseInt(item.productId.price) * parseInt(item.qty)) });
        toReturn.push({ sum, auction: productsByAuction[0].auctionId });//נכניס למערך את פרטי מכירה, ואת המחיר
    })

    return res.send(toReturn);
}
module.exports = {
    getAll, getById, addUser, updateUser, deleteUser, updateUserStatus, isUserExist, beManager, isLoginGoogle,
    removeProductFromCart, addProductToCart, getProductsInCartByAuction, emptyTheCartByAuction, getCart
}