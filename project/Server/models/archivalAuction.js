const mongoose = require("mongoose");
const auction = require("./auction");

const archivalAuctionSchema = new mongoose.Schema({ auction });

const ArchivalAuction =  mongoose.model("Archivalauction", archivalAuctionSchema);

module.exports = ArchivalAuction;

