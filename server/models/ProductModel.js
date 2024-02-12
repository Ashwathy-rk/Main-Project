// product.model.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productImage: { type: String, required: true },
  productName: { type: String, required: true },
  provider: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
