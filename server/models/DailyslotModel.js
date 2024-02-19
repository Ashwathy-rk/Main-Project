// models/DailySlot.js

const mongoose = require('mongoose');

const dailySlotSchema = new mongoose.Schema({
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop', // Make sure it matches the model name for your shop
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  availableSpiceCapacity: {
    type: Number,
    required: true,
  },
});

const DailySlot = mongoose.model('DailySlot', dailySlotSchema);

module.exports = DailySlot;
