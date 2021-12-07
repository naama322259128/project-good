const User = require("../models/user");

const mongoose = require("mongoose");
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

//בודקת האם משתמש קיים לפי סיסמא ומייל
const isUserExist = async (req, res) => {
    let { password, email } = req.params;
    let user = await User.findOne({ "password": password, "email": email });
    if (!user)
        return res.status(400).send("Incorrect details entered");
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

    // `doc` is the document _after_ `update` was applied because of
    // `returnOriginal: false`
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
    console.log('-----------------------');
    let tmp = user.shoppingCart
    let obj = tmp.find(x => x.productId.toString() === productId.toString());
    console.log(obj);
    let index = tmp.indexOf(obj);
    console.log("index");
    console.log(index);
    if (index == -1)
        tmp.push({ productId: productId, qty: cnt, auctionId: auctionId })
    else
        tmp.fill(obj.qty += parseInt(cnt), index, index++);
    user.shoppingCart = tmp;
    await user.save();
    return res.send(user.shoppingCart);
}

const removeProductFromCart = async (req, res) => {
    let { auctionId } = req.params;
    let { productId } = req.params;
    let { userId } = req.params;
    let { cnt } = req.params;
}

const emptyTheBasketBuAuction = async (req, res) => {
    let { auctionId } = req.params;
    let { userId } = req.params;

    let user = await User.findById(userId);
    let cart = user.shoppingCart;
    if (cart) {
        let arr = lott.filter(l => l.auctionId.toString() != auctionId.toString());//כל הכרטיסים למוצר הזה
        user.shoppingCart = arr;
        await user.save();
    }
    return res.send(user.shoppingCart);
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
    console.log(arr);
    return res.send(arr);
}

module.exports = {
    getAll, getById, addUser, updateUser, deleteUser, updateUserStatus, isUserExist, beManager, isLoginGoogle,
    removeProductFromCart, addProductToCart, getProductsInCartByAuction, emptyTheBasketBuAuction
}