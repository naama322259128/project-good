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
    console.log(user)
    let user = req.body;
    if (await isEmailExist(user.email) == true) {
        console.log("This email is exist");
        return res.send("This email is exist");
    }
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
    user.fullName = userBody.fullName || user.fullName;
    user.phone = userBody.phone || user.phone;
    user.password = userBody.password || user.password;
    user.address = userBody.address || user.address;
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

const beManager = async (req, res) => {
    let { _id } = req.params;
    let doc = await User.findOneAndUpdate({ _id: _id }, { status: 'AUCTION_MANAGER' });
    if (!doc)
        return res.status(400).send("Incorrect details entered");
    return res.send(doc);
}

module.exports = {
    getAll, getById, addUser, updateUser, deleteUser, updateUserStatus, isUserExist, beManager

}
