const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/BookingModel');
const DailySlot = require('../models/DailyslotModel');

router.post('/bookslot/:shopId', async (req, res) => {
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

    // Fetch corresponding DailySlot for the given shopId and bookingDate
    const dailySlot = await DailySlot.findOne({
      shopId: req.params.shopId,
      date: bookingDate,
    });

    if (!dailySlot) {
      return res.status(404).json({ error: 'DailySlot not found' });
    }

    // Find the relevant slot within the DailySlot based on bookingTime
    const slotIndex = dailySlot.slots.findIndex((slot) => {
      const slotStartTime = new Date(`${bookingDate} ${slot.startTime}`);
      const slotEndTime = new Date(`${bookingDate} ${slot.endTime}`);
      const bookingDateTime = new Date(`${bookingDate} ${bookingTime}`);

      return bookingDateTime >= slotStartTime && bookingDateTime <= slotEndTime;
    });

    if (slotIndex === -1) {
      return res.status(404).json({ error: 'Slot not found in DailySlot' });
    }

    // Update availableSpiceCapacity by reducing it according to bookingAmount
    const updatedDailySlots = [...dailySlot.slots];
    const spiceReduction = bookingAmountUnit === 'kg' ? bookingAmount : bookingAmount / 1000;
    updatedDailySlots[slotIndex].spiceCapacity -= spiceReduction;

    dailySlot.availableSpiceCapacity -= spiceReduction;
    dailySlot.slots = updatedDailySlots;

    // Save the updated DailySlot to the database
    await dailySlot.save();

    // Save the booking details
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



router.post('/dailyslot/:shopId', async (req, res) => {
  try {
    const { shopId } = req.params;
    const { date, spiceCapacity } = req.body;

    const newDailySlot = new DailySlot({
      shopId,
      date,
      spiceCapacity,
    });

    await newDailySlot.save();
    res.json(newDailySlot);
  } catch (error) {
    console.error('Error creating daily slot:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


