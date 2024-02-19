const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  numberOfLots: { type: Number, required: true },
  qtySold: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  avgPrice: { type: Number, required: true },
});

const Price = mongoose.model('Price', PriceSchema);

module.exports = Price;
