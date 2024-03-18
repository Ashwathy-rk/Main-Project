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

module.exports = router;





router.get('/orderhis', async (req, res) => {
  const userId = req.query.userId; // Extract userId from query parameters
  console.log('User ID:', userId);

  try {
    // Find orders associated with the user
    const orders = await Order.find({  userId });
    console.log("Orders:", orders);
    
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for the user' });
    }
    
    res.status(200).json({ orders: orders });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});


// Route to fetch current order
router.get('/:orderId', async (req, res) => {
  try
  {
    const orderId = req.params.orderId;

    // Fetch the latest order for the current user including user details
    const order = await Order.findOne({ orderId }).sort({ orderDate: -1 });

    if (!order) {
      return res.status(404).json({ message: 'No order found for the current user.' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching current order:', error);
    res.status(500).json({ message: 'Internal server error' });
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





