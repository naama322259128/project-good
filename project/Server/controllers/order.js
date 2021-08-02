const Order = require("../models/order");

const mongoose = require("mongoose");
const getAll = async (req, res) => {
    let orders = await Order.find();
    return res.send(orders);
}

const getById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let order = await  Order.findById(id);
    if (!order)
        return res.status(404).send("There is no order with such an ID number");
    return res.send(order);
}

const addOrder = async (req, res) => {
    let order = req.body;
    let newOrder = new Order(order);
    try {
        await newOrder.save();
        console.log(newOrder)
        return res.send(newOrder);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

const deleteOrder = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let order = await Order.findByIdAndRemove(id);
    if (!order)
        return res.status(404).send("There is no order manager with such an ID number");
    console.log(order);
    return res.send(order);
}

module.exports = {
    getAll, getById, addOrder, deleteOrder
}