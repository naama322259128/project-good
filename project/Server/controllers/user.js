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

const addUser = async (req, res) => {
    let user = req.body;
    let newUser = new User(user);
    try {
        await newUser.save();
        console.log(newUser)
        return res.send(newUser);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

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
    user.adress = userBody.adress || user.adress;
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



module.exports = {
    getAll, getById, addUser, updateUser, deleteUser, updateUserStatus

}