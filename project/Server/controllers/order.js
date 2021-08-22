const Order = require("../models/order");

const mongoose = require("mongoose");

const getAll = async (req, res) => {
    let orders = await Order.find();
    return res.send(orders);
}

//הצגת הזמנה לפי id
const getById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("Invalid ID number");
    let order = await Order.findById(id);
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

//פונקציה שמחזירה רשימה הזמנות 
//של משתמש מסוים
const getOrderListByIdUser = async (req, res) => {
    let { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId))
        return res.status(404).send("Invalid ID number");
    let orders = await Order.find({ "userId": userId });//לבדוק אם ככה שואלים
    if (!orders)
        return res.status(404).send("There is no orders with such an ID user");
    return res.send(orders);
}
module.exports = {
    getAll, getById, addOrder, deleteOrder,getOrderListByIdUser
}