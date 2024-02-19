// controllers/priceController.js
const express = require('express');
const router = express.Router();
const Price = require('../models/DealerPriceModel');

// Add a new price
router.post('/addprice', async (req, res) => {
  try {
    const { date, numberOfLots, qtySold, maxPrice, avgPrice } = req.body;
    const newPrice = new Price({ date, numberOfLots, qtySold, maxPrice, avgPrice });
    await newPrice.save();
    res.status(201).json({ message: 'Price added successfully' });
  } catch (error) {
    console.error('Error adding price:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all prices
router.get('/getprice', async (req, res) => {
  try {
    const prices = await Price.find();
    res.json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
