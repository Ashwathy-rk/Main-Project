const express = require('express');
const router = express.Router();
const Booking = require('../models/BookingModel');
const Shop = require('../models/ShopModel');

router.post('/bookslot', async (req, res) => {
  try {
    const {
      userId,
      name,
      address,
      phoneNumber,
      bookingAmount,
      bookingAmountUnit,
      bookingDate,
      bookingTime,
    } = req.body;

    const newBooking = new Booking({
      userId,
      name,
      address,
      phoneNumber,
      bookingAmount,
      bookingAmountUnit,
      bookingDate,
      bookingTime,
    });

    const savedBooking = await newBooking.save();

    const shop = await Shop.findOne( { shopId: req.params.shopId } );
    if (shop) {
      const spiceReduction = bookingAmountUnit === 'kg' ? bookingAmount : bookingAmount / 1000;
      shop.spiceCapacity -= spiceReduction;
      await shop.save();
    }

    res.json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
