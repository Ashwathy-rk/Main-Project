// orderRoutes.js

const express = require('express');
const Razorpay = require('razorpay');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: 'rzp_test_QCVPmuBwOiEzBI', // Replace with your Key ID
  key_secret: 'JFZYLJBq9hPDYf3TRVBDKaA1', // Replace with your Key Secret
});

const createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: 1000, // Convert to paise
    currency,
    receipt: 'order_receipt',
  };
  console.log(options,'df');


  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

router.post('/create-order', createOrder);

module.exports = router;

router.post('/verify-payment', (req, res) => {
  // Implement payment verification logic here
  // Check the payment signature and update the booking status

  const body = req.body.razorpay_order_id + '|' + req.body.razorpay_payment_id;

  const generatedSignature = crypto.createHmac('sha256', 'JFZYLJBq9hPDYf3TRVBDKaA1')
                                  .update(body.toString())
                                  .digest('hex');

  if (generatedSignature === req.body.razorpay_signature) {
    // Payment successful, update the booking status
    res.json({ success: true });
  } else {
    // Payment verification failed
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

module.exports = router;
