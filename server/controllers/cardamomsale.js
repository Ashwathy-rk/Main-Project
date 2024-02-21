// cardamomsales.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const CardamomSale = require('../models/CardamomsaleModel');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/cardamomSale');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use('/uploads', express.static('uploads'));

router.post('/cardamomsale', upload.single('cardamomImage'), async (req, res) => {
  try {
    const { amountInKg, date } = req.body;

    // Validate request data
    if (!amountInKg || !date) {
      return res.status(400).json({ error: 'Amount in Kg and Date are required' });
    }

    // Get the path of the uploaded cardamom image
    const cardamomImagePath = req.file.path;
    const slicedPath = cardamomImagePath.slice(cardamomImagePath.indexOf('uploads/cardamomSale') + 1);

    // Create a new CardamomSale instance
    const newCardamomSale = new CardamomSale({
      amountInKg,
      cardamomImage: slicedPath,
      date,
    });

    // Save the CardamomSale to the database
    await newCardamomSale.save();

    res.status(201).json({ msg: 'Cardamom sale added successfully' });
  } catch (error) {
    console.error('Error adding cardamom sale:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});


router.get('/cardamomsaleview', async (req, res) => {
  try {
    const cardamomSales = await CardamomSale.find();
    res.status(200).json(cardamomSales);
  } catch (error) {
    console.error('Error fetching cardamom sales data:', error);
    res.status(500).json({ msg: 'Failed to fetch cardamom sales data' });
  }
});

module.exports = router;
