// routes/dailyslot.js
const express = require('express');
const router = express.Router();
const DailySlot = require('../models/DailyslotModel');
const Shop = require('../models/ShopModel');

router.post('/dailyslot/:shopId', async (req, res) => {
  try {
    const { shopId } = req.params;
    const { date, spiceCapacity } = req.body;

    // Fetch shop details
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    const newDailySlot = new DailySlot({
      shopId,
      date,
      availableSpiceCapacity: shop.spiceCapacity, // Set availableSpiceCapacity based on shop details
      slots: [
        {
          startTime: '09:00 AM', // Set the start time as needed
          endTime: '05:00 PM', // Set the end time as needed
          spiceCapacity,
        },
      ],
    });

    await newDailySlot.save();
    res.json(newDailySlot);
  } catch (error) {
    console.error('Error creating daily slot:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
