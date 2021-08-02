const PricingGroup = require("../models/pricingGroup");

const mongoose = require("mongoose");
const getAll = async (req, res) => {
    let pricingGroups = await PricingGroup.find();
    return res.send(pricingGroups);
}

const getById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let pricingGroup = await PricingGroup.findById(id);
    if (!pricingGroup)
        return res.status(404).send("There is no pricing group with such an ID number");
    return res.send(pricingGroup);
}

const addPricingGroup = async (req, res) => {
    let pricingGroup = req.body;
    let newPricingGroup = new PricingGroup(pricingGroup);
    try {
        await newPricingGroup.save();
        console.log(newPricingGroup)
        return res.send(newPricingGroup);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

module.exports = {
    getAll, getById,addPricingGroup

}