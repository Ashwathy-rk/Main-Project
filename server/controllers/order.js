const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel')

// Route for placing an order
router.post('/order/:productId', async (req, res) => {
  const { totalAmount, orderItems } = req.body;
  const { userId, userName } = orderItems[0];
  const productId = req.params.productId; // Extract productId from URL params
  console.log(req.body)

  try {
    // Validate the structure of the request payload
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      throw new Error('Invalid order items provided.');
    }

    // Create a new order instance
    const newOrder = new Order({ totalAmount,userId, userName });
    console.log(userId, userName)

    // Map order items to include productId
    const mappedOrderItems = orderItems.map(item => ({
      userName:item.userName,
      userId:item,userId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      productName:item.productName
    }));

    newOrder.items = mappedOrderItems;

    // Update product stock and save the order to the database
    const product = await Product.findById(productId);

    // Check if items array is iterable and has items
    if (!Array.isArray(mappedOrderItems) || mappedOrderItems.length === 0) {
      throw new Error('Items array is empty or not iterable.');
    }

    // Check and set productId in each item
    mappedOrderItems.forEach(item => {
      if (!item.productId) {
        throw new Error('ProductId is required for each item.');
      }
      // Update product stock
      product.stock -= item.quantity;
    });

    // Save the product with the updated stock
    await product.save();

    // Save the order to the database 

  
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully!', orderId: newOrder._id });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});

module.exports = router;



router.get('/orderhis', async (req, res) => {
  const userId = req.query.userId; // Extract userId from query parameters
  try {
    // Find the user by userId
    const user = await User.findById(userId).populate('orders');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ orders: user.orders });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

module.exports = router;

