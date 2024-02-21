// controllers/priceController.js
const express = require('express');
const router = express.Router();
const Price = require('../models/DealerPriceModel');
const Dealer = require('../models/DealerModel');

// Add a new price
router.post('/addprice', async (req, res) => {
  try {
    const { date, maxPrice, avgPrice, dealerName, dealerLocation } = req.body;

    // Find or create the dealer based on dealerName and dealerLocation
    const [dealer] = await Dealer.findOrCreate({ dealerName, dealerLocation });

    const newPrice = new Price({
      date,
      maxPrice,
      avgPrice,
      dealer: dealer._id,
    });

    await newPrice.save();
    
    res.status(201).json({ success: true, message: 'Price added successfully' });
  } catch (error) {
    console.error('Error adding price:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Get all prices with dealer details
router.get('/getprice', async (req, res) => {
  try {
    const prices = await Price.find().populate('dealer');
    res.status(200).json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;