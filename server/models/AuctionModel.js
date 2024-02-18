const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  auctioneer: { type: String, required: true },
  numberOfLots: { type: Number, required: true },
  totalQtyArrived: { type: Number, required: true },
  qtySold: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  avgPrice: { type: Number, required: true },
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
