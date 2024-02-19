const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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




router.patch('/bookingsold/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    console.log(bookingId);
    const { sold } = req.body;

    console.log('Received request to update bookingId:', bookingId, 'with sold:', sold);

    // Validate if bookingId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ error: 'Invalid bookingId' });
    }

    // Update the 'sold' property in the database using findOneAndUpdate
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: bookingId },
      { $set: { sold } },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    console.log('Updated Booking:', updatedBooking);
    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating sold status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
