import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './Orderconfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams(); // Fetch the product ID from the URL parameters
  const [formattedDate, setFormattedDate] = useState('');
  const { orderDetails } = location?.state || {};
  console.log('ProductId from URL:', productId);

  useEffect(() => {
    if (orderDetails && orderDetails.items) {
      const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };

      const orderDate = new Date(orderDetails.orderDate || Date.now());
      setFormattedDate(
        `${orderDate.toLocaleDateString(undefined, dateOptions)} ${orderDate.toLocaleTimeString(
          undefined,
          timeOptions
        )}`
      );
    }
  }, [orderDetails]);
  const handlePlaceOrder = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('userId'));
const userName = JSON.parse(localStorage.getItem('username'));


      if (!userId || !userName) {
        console.error('User details not found in localStorage.');
        return;
      }

      if (orderDetails && orderDetails.items && orderDetails.totalAmount) {
        // Map order items to include productId
        const orderItems = orderDetails.items.map(item => {
          if (!productId) {
            console.error('ProductId is missing in an item:', item);
          }
  
          return {
            productId: productId,
            quantity: item.quantity,
            price: item.price,
            productName:item.productName,
            userId:userId,
            userName:userName,
          };
        });

        console.log(orderItems )
        const orderResponse = await axios.post('http://localhost:5000/api/create-order', {
          items: orderItems,
          amount: orderDetails.totalAmount,
          currency: 'INR',
        });

        const orderId = orderResponse.data.id;

        const options = {
          key: 'rzp_test_QCVPmuBwOiEzBI',
          amount: orderDetails.totalAmount * 100,
          currency: 'INR',
          name: 'Your Company',
          description: 'Payment for Order',
          order_id: orderId,
          handler: function (response) {
            console.log('Payment Successful:', response);
            axios.post(`http://localhost:5000/api/order/order/${productId}`, { ...orderDetails,orderItems, paymentDetails: response })
              .then(() => {
                navigate('productview');
                alert('Order placed successfully');
              })
              .catch((error) => {
                console.error('Error placing order:', error);
                alert('An error occurred while placing the order.');
              });
          },
          prefill: {
            name: orderDetails.name || 'Test User',
            email: orderDetails.email || 'test.user@example.com',
            contact: orderDetails.phoneNumber || '9999999999',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          const rzp = new window.Razorpay(options);
          rzp.open();
        };

        document.head.appendChild(script);
      } else {
        console.error('Invalid orderDetails:', orderDetails);
        alert('Invalid order details. Unable to place the order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order.');
    }
  };

  return (
    <div className="order-confirmation-container">
      <div className="order-details-box">
        <h2>Order Confirmation</h2>

        <div className="order-details">
          {formattedDate && (
            <div>
              <strong>Order Date:</strong> {formattedDate}
            </div>
          )}
        </div>

        <div className="order-items">
          <strong>Order Items:</strong>
          <ul className="order-items-list">
            {orderDetails &&
              orderDetails.items &&
              orderDetails.items.map((item, index) => (
                <li key={index}>
                  {item.productName} - Quantity: {item.quantity} - Price: ${item.price}
                </li>
              ))}
          </ul>
        </div>

        <div className="total-amount">
          {orderDetails && orderDetails.totalAmount && (
            <div>
              <strong>Total Amount:</strong> ${orderDetails.totalAmount}
            </div>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          <button onClick={handlePlaceOrder} className="place-order-button">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
