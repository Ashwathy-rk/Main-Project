import React, { useState } from 'react';
import axios from 'axios';

const RazorpayPayment = () => {
  const [orderId, setOrderId] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create-order/create-order', {
        amount: 100, // Replace with the actual amount
        currency: 'INR',
      });

      const { id: order_id } = response.data;

      setOrderId(order_id);

      const options = {
        key: 'rzp_test_QCVPmuBwOiEzBI', // Replace with your Key ID
        amount: 10000, // Amount in paise (e.g., 100 rupees)
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Payment for Booking',
        image: 'path_to_your_logo.png', // Optional
        order_id,
        handler: (response) => {
          console.log(response);

          // After successful payment, make a server call to verify the payment
          axios.post('http://localhost:5000/verify-payment', response)
            .then((verificationResponse) => {
              console.log(verificationResponse.data);
              // Handle the verification response as needed
            })
            .catch((verificationError) => {
              console.error(verificationError);
              // Handle the verification error
            });
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '1234567890',
        },
        notes: {
          address: 'Booking Address',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default RazorpayPayment;
