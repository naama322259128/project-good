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
    console.log(user);
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
    console.log(user);
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
    // `new: true`
    let doc = await User.findOneAndUpdate(filter, update, {
        new: true
    });

    if (!doc)
        return res.status(400).send("Incorrect details entered");
    return res.send(doc);
}

module.exports = {
    getAll, getById, addUser, updateUser, deleteUser, updateUserStatus, isUserExist, beManager, isLoginGoogle
}