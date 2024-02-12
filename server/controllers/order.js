const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel');

// Route for placing an order
router.post('/order', async (req, res) => {
  const { items, totalAmount } = req.body;

  try {
    // Create a new order instance
    const newOrder = new Order({ items, totalAmount });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully!', orderId: newOrder._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

module.exports = router;
