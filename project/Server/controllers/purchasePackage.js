const PurchasePackage = require("../models/purchasePackage");

const mongoose = require("mongoose");
const getAll = async (req, res) => {
    let purchasePackages = await PurchasePackage.find();
    return res.send(purchasePackages);
}

const getById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let purchasePackage = await PurchasePackage.findById(id);
    if (!purchasePackage)
        return res.status(404).send("There is no purchase package with such an ID number");
    return res.send(purchasePackage);
}

const addPurchasePackage = async (req, res) => {
    let purchasePackage = req.body;
    let newPurchasePackage = new PurchasePackage(purchasePackage);
    try {
        await newPurchasePackage.save();
        console.log(newPurchasePackage)
        return res.send(newPurchasePackage);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

const deletePurchasePackage = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let purchasePackage = await PurchasePackage.findByIdAndRemove(id);
    if (!purchasePackage)
        return res.status(404).send("There is no purchase package with such an ID number");
    console.log(purchasePackage);
    return res.send(purchasePackage);
}
module.exports = {
    getAll, getById, addPurchasePackage, deletePurchasePackage
}