const ArchivalAuction = require("../models/archivalAuction");
const mongoose = require("mongoose");

const getAll = async (req, res) => {
    let archivalAuctions = await ArchivalAuction.find();
    return res.send(archivalAuctions);
}
const getById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let archivalAuction = await ArchivalAuction.findById(id);
    if (!archivalAuction)
        return res.status(404).send("There is no archival auction with such an ID number");
    return res.send(archivalAuction);
}
const addArchivalAuction = async (req, res) => {
    let archivalAuction = req.body;
    let newArchivalAuction = new ArchivalAuction(archivalAuction);
    try {
        await newArchivalAuction.save();
        console.log(newArchivalAuction)
        return res.send(newArchivalAuction);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
const deleteArchivalAuction = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let archivalAuction = await ArchivalAuction.findByIdAndRemove(id);
    if (!archivalAuction)
        return res.status(404).send("There is no archival auction with such an ID number");
    console.log(archivalAuction);
    return res.send(archivalAuction);
}
module.exports = {
    getAll, getById, addArchivalAuction, deleteArchivalAuction
}