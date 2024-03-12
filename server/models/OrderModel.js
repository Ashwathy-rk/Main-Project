const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderDate: { type: Date, default: Date.now },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      productName: {
        type: String,  // Add this line if productName is required in your schema
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
