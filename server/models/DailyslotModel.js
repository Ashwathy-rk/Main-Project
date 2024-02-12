// models/DailySlotModel.js
const mongoose = require('mongoose');

const dailySlotSchema = new mongoose.Schema({
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  date: { type: Date, required: true },
 
});

dailySlotSchema.virtual('capacity').get(function () {
  const shopSpiceCapacity = this.shop ? this.shop.spiceCapacity : 0;
  return shopSpiceCapacity;
});

const DailySlot = mongoose.model('DailySlot', dailySlotSchema);

module.exports = DailySlot;
