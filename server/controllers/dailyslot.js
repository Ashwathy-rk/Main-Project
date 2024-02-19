// routes/dailyslot.js

const express = require('express');
const router = express.Router();
const DailySlot = require('../models/DailyslotModel');
const Shop = require('../models/ShopModel');

router.post('/dailyslot/:shopId', async (req, res) => {
  try {
    const { shopId } = req.params;
    const { date, availableSpiceCapacity } = req.body;

    const existingSlot = await DailySlot.findOne({ shopId, date });
    if (existingSlot) {
      return res.status(400).json({ msg: 'Daily slot already exists for this date.' });
    }

    const newDailySlot = new DailySlot({
      shopId,
      date,
      availableSpiceCapacity,
    });

    await newDailySlot.save();

    res.status(201).json(newDailySlot);
  } catch (error) {
    console.error('Error adding daily slot:', error);
    res.status(500).json({ msg: 'Failed to add daily slot' });
  }
});

router.get('/getdailyslot/:shopId', async (req, res) => {
  try {
    const { shopId, date } = req.params;
    const existingSlot = await DailySlot.findOne({ shopId, date });

    res.status(200).json(existingSlot);
  } catch (error) {
    console.error('Error checking daily slot:', error);
    res.status(500).json({ msg: 'Failed to check daily slot' });
  }
});

module.exports = router;
router.get('/checkdailyslot/:shopId/:date', async (req, res) => {
  try {
    const { shopId, date } = req.params;
    const existingSlot = await DailySlot.findOne({ shopId, date });

    res.status(200).json({ exists: !!existingSlot });
  } catch (error) {
    console.error('Error checking daily slot:', error);
    res.status(500).json({ msg: 'Failed to check daily slot' });
  }
});

module.exports = router;

module.exports = router;
