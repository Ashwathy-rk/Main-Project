// routes/dailySlot.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DailySlot = require('../models/DailyslotModel');
const Shop = require('../models/ShopModel');

// Get shop details and daily slots for a specific shop
router.get('/dailyslot/:shopId', async (req, res) => {
  const { shopId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(shopId)) {
      return res.status(400).json({ error: 'Invalid shopId' });
    }

    const [shop, dailySlots] = await Promise.all([
      Shop.findById(shopId),
      DailySlot.find({ shop: shopId }).sort({ date: 1 }),
    ]);

    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    res.json({ shop, dailySlots });
  } catch (error) {
    console.error('Error fetching shop and daily slots:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
