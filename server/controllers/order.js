const express = require('express');
const router = express.Router();
const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const Payment = require('../models/PaymentModel')


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
      userId:item.userId,
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


    // Assuming you have already imported necessary modules and model

    res.status(201).json({ message: 'Order placed successfully!', orderId: newOrder._id });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});



router.get('/ordering/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ 'items.userId': userId }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get product stock by ID
router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId; // Extract productId from URL parameters

    // Find the product by ID and project only the stock field
    const product = await Product.findById(productId, 'stock');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ stock: product.stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;