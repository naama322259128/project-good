const Order = require("../models/order");
const Auction = require("../models/auction");

const mongoose = require("mongoose");
const User = require("../models/user");

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

//הפונקציה הזו מוסיפה לטבלת ההזמנות ומוחקת למשתמש את המוצרים של המכירה הזו מהסל
const addOrder = async (req, res) => {

    let order = req.body;
    let newOrder =new Order(order);

    try {
        await newOrder.save();
        let user = await User.findById(newOrder.userId);
        let arr = user.shoppingCart.filter(item => item.auctionId.toString() != order.auctionId);
        user.shoppingCart = arr;
        await user.save();
        return res.send(user);
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

//מחזירה הזמנות של משתמש
const getUserOrdersList = async (req, res) => {
    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Invalid ID number");
    let orders = await Order.find({ "userId": _id }).
        populate([
            { path: 'auctionId', select: 'name organizationName status' },
            { path: 'orderDetails.productId', select: 'name image' }
        ]);

    return res.send(orders);
}

//מחזירה הזמנה עפ"י קוד משתמש ומכירה
const getOrderByToUserCodeAndAuction = async (req, res) => {
    let { user_id, auction_id } = req.params;
    let order = await Order.findOne({ "userId": user_id, "auctionId": auction_id });
    if (!order)
        return res.status(400).send("Incorrect details entered");
    return res.send(order);
}

// המכירה שמכרה הכי הרבה כרטיסים
const getAuctionSoldMostTickets = async (req, res) => {

    //לעבור על טבלת הזמנות
    //בכל הזמנה לסכום את הכמויות של הכרטיסים מוצרים
    let list = await Order.aggregate([
        { $unwind: "$orderDetails" },
        {
            $group: {
                _id: "$auctionId",
                count: { $sum: "$orderDetails.qty" }
            }
            // },
            // {
            //     $group: {
            //         _id: 0,
            //         Details: { $push: { Details: "$_id", Value: "$Value" } }
            //     }

            // },
            // { $project: { Details: 1, _id: 0 } 
        }
    ])

    if (!list) return res.status(404).send("There is no orders with such an ID user");
    return res.send(list);
    //אם יש כמה מכירות שהן המקסימום?
    // return list.
}

//פרטי הזמנה 
const getOrderDetails = async (req, res) => {
    console.log("getOrder");

    let { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Invalid ID number");
    let order = await Order.findById(_id)
        .
        populate([
            { path: 'auctionId', select: 'organizationName name' }
        ]);
    console.log(order);
    return res.send(order);
}

module.exports = {
    getAll, getById, addOrder, deleteOrder, getUserOrdersList, getOrderByToUserCodeAndAuction, getAuctionSoldMostTickets, getOrderDetails
}