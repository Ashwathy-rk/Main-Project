// models/CardamomSale.js
const mongoose = require('mongoose');

const cardamomSaleSchema = new mongoose.Schema({
  amountInKg: { type: Number, required: true },
  cardamomImage: { type: String, required: true },
  date: { type: Date, required: true },
});

const CardamomSale = mongoose.model('CardamomSale', cardamomSaleSchema);

module.exports = CardamomSale;
