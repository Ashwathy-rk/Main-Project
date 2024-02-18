// routes/auctionRoutes.js
const express = require('express');
const router = express.Router();
const Auction = require('../models/AuctionModel');

router.post('/addauction', async (req, res) => {
  try {
    const {
      date,
      auctioneer,
      numberOfLots,
      totalQtyArrived,
      qtySold,
      maxPrice,
      avgPrice,
    } = req.body;

    const newAuction = new Auction({
      date,
      auctioneer,
      numberOfLots,
      totalQtyArrived,
      qtySold,
      maxPrice,
      avgPrice,
    });

    await newAuction.save();

    res.status(201).json({ msg: 'Auction details added successfully' });
  } catch (error) {
    console.error('Error adding auction details:', error);
    res.status(500).json({ msg: 'Failed to add auction details' });
  }
});

router.get('/getauctions', async (req, res) => {
    try {
      const auctions = await Auction.find();
      res.status(200).json(auctions);
    } catch (error) {
      console.error('Error fetching auctions:', error);
      res.status(500).json({ msg: 'Failed to fetch auctions' });
    }
  });
  


module.exports = router;
