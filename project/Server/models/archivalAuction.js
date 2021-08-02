const mongoose = require("mongoose");
const auctionSchema = require("./auction").schema;
const archivalAuctionSchema = new mongoose.Schema({ auctionSchema });

const ArchivalAuction = mongoose.model("Archivalauction", archivalAuctionSchema);
module.exports = ArchivalAuction;
