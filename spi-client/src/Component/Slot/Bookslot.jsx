import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUser } from '../UseContext';

const BookingPage = () => {
  const { shopId, date } = useParams();
  const { user } = useUser() || { user: { user: {} } };
  const [shop, setShop] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    bookingAmount: 0,
    bookingAmountUnit: 'kg',
    bookingDate: date, 
    bookingTime: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    bookingAmount: '',
  });

  useEffect(() => {
    // Set the current system date to bookingDetails
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      bookingTime: formattedTime,
    }));
  }, []); // Run this effect only once, when the component mounts

  useEffect(() => {
    // Set user details when they become available
    if (user && user.user.name) {
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        name: user.user.name,
        address: user.user.address || '',
        phoneNumber: user.user.phoneNumber || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shopviewbyid/shopviewbyid/${shopId}`);
        console.log('Shop Response from server:', response.data);

        // Check if response data is an object
        if (response.data && typeof response.data === 'object') {
          setShop(response.data);
        } else {
          console.error('Shop data is not available or has an incorrect format.');
        }
      } catch (error) {
        console.error('Error fetching shop data:', error);
      }
    };

    fetchShopData();
  }, [shopId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    switch (name) {
      case 'name':
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: value.length < 3 ? 'Name must be at least 3 characters long' : '',
        }));
        break;
      case 'address':
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: value.length < 5 ? 'Address must be at least 5 characters long' : '',
        }));
        break;
      case 'phoneNumber':
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: !/^\d{10}$/i.test(value) ? 'Invalid phone number' : '',
        }));
        break;
      case 'bookingAmount':
        setErrors((prevErrors) => ({
          ...prevErrors,
          bookingAmount: isNaN(value) ? 'Booking amount must be a number' : '',
        }));
        break;
      default:
        break;
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const isValid = Object.values(errors).every((error) => !error);

    if (!isValid) {
      console.error('Form has errors. Please correct them before submitting.');
      return;
    }

    try {
      // Perform the booking submission logic here
      const response = await axios.post(`http://localhost:5000/api/bookslot/bookslot/${shopId}`, bookingDetails);

      console.log('Booking Details:', response.data);
  alert('Booking successful');

      
      // Additional logic for "Pay on Delivery" option
      if (e.target.name === 'payOnDelivery') {
        // Redirect or perform other actions for "Pay on Delivery"
      }

      // Additional logic for "Pay Now" option
      if (e.target.name === 'payNow') {
        // Add Razorpay integration logic here
        handleRazorpayPayment();
      }

      // Add any additional logic or redirection after a successful booking
    } catch (error) {
      console.error('Error submitting booking:', error);
      // Handle error, show a message, etc.
    }
  };

  // Razorpay integration logic for "Pay Now"
  const handleRazorpayPayment = async () => {
    try {
      // Dynamically add the Razorpay script to the document's head
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
  
      // Define the Razorpay handler function
      window.handleRazorpayResponse = function(response) {
        alert(response.razorpay_payment_id);
        alert('Payment Successful');
      };
  
      // Append the script to the document's head
      document.head.appendChild(script);
  
      // Fetch the shop details using the shopId
      const shopResponse = await axios.get(`http://localhost:5000/api/shopviewbyid/shopviewbyid/${shopId}`);
      
      if (!shopResponse.data || typeof shopResponse.data !== 'object') {
        console.error('Shop data is not available or has an incorrect format.');
        return;
      }
  
      const shop = shopResponse.data;
      
      // Assuming you have fetched the bookingDetails from state
      const { bookingAmount } = bookingDetails;
  
      // Calculate the total amount for payment
      const totalAmount = bookingAmount * shop.parchingPrice;
  
      // Create order on the server
      const orderResponse = await axios.post('http://localhost:5000/api/create-order', {
        amount: totalAmount,
        currency: 'INR',
      });
  
      const { data: { order_id } } = orderResponse;
  
      // Define the options for the Razorpay checkout
      const options = {
        key: 'rzp_test_QCVPmuBwOiEzBI',
        amount: totalAmount * 100, // Amount must be in paise
        currency: 'INR',
        name: 'Test Company',
        order_id,
        prefill: {
          name: bookingDetails.name || 'Test User',
          email: bookingDetails.email || 'test.user@example.com',
          contact: bookingDetails.phoneNumber || '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
        handler: 'handleRazorpayResponse', // Use the defined handler function
      };
  
      // Open the Razorpay checkout
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error initiating Razorpay payment:', error);
      alert('Error initiating Razorpay payment');
    }
  };
  
  
  return (
    <div className="container">
      <h2>Booking Page</h2>
      {shop && (
        <form onSubmit={handleBookingSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={bookingDetails.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={bookingDetails.address}
              onChange={handleInputChange}
              required
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={bookingDetails.phoneNumber}
              onChange={handleInputChange}
              required
            />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label>Booking Amount:</label>
            <input
              type="number"
              name="bookingAmount"
              value={bookingDetails.bookingAmount}
              onChange={handleInputChange}
              required
            />
            <select
              name="bookingAmountUnit"
              value={bookingDetails.bookingAmountUnit}
              onChange={handleInputChange}
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="lb">lb</option>
            </select>
            {errors.bookingAmount && <span className="error">{errors.bookingAmount}</span>}
          </div>

          {/* Additional form fields can be added here as needed */}

          {/* "Pay Now" button with inline Razorpay script */}
          <button type="button" onClick={handleRazorpayPayment}>
            Pay Now
          </button>
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

          {/* "Pay on Delivery" button */}
          <button type="submit" name="payOnDelivery">
            Pay on Delivery
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingPage;
