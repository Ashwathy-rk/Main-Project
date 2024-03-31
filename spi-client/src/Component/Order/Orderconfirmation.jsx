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

  const [orderPlaced, setOrderPlaced] = useState(false);

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

        console.log(orderItems);

        // Check stock before placing the order
        const availableStock = await axios.get(`http://localhost:5000/api/productstock/${productId}`);
        const orderedQuantity = orderDetails.items.reduce((total, item) => total + item.quantity, 0);
        
        if (availableStock.data.stock <= 0) {
          alert('Sorry, the product is out of stock.');
          return;
        } else if (orderedQuantity > availableStock.data.stock) {
          alert('Sorry, the ordered quantity exceeds the available stock.');
          return;
        }
        const orderResponse = await axios.post('http://localhost:5000/api/create-order', {
          items: orderItems,
          amount: orderDetails.totalAmount,
          currency: 'INR',
        });

        const order_Id = orderResponse.data.id;

        const paymentResponse = await axios.post('http://localhost:5000/api/save-payment', {
        userId: userId,
        orderId: order_Id,
        amount: orderDetails.totalAmount,
        currency: 'INR',
        // Add other payment details such as razorpayOrderId, razorpayPaymentId, etc.
      });

      console.log('Payment details saved:', paymentResponse.data);

      // localStorage.setItem('orderId', orderId);

        const options = {
          key: "rzp_test_QCVPmuBwOiEzBI",
          amount: orderDetails.totalAmount * 100,
          currency: "INR",
          name: "Your Company",
          description: "Payment for Order",
          order_id: order_Id,
          handler: async function (response) {
            console.log("Payment Successful:", response);
            try {
              const orderPlacedResponse = await axios.post(`http://localhost:5000/api/order/order/${productId}`, {
                ...orderDetails,
                orderItems,
                paymentDetails: response,
              });
              
              setOrderPlaced(true);
              console.log("Order placed successfully", orderPlacedResponse.data);
              
              const orderId = orderPlacedResponse.data.orderId;
              localStorage.setItem("orderId", orderId);
          
              await updateDeliveryStatus(orderId);
              
              alert("Order placed successfully");
            } catch (error) {
              console.error("Error placing order:", error);
              alert("An error occurred while placing the order.");
            }
          },
          
             
          
          prefill: {
            name: orderDetails.name || "Test User",
            email: orderDetails.email || "test.user@example.com",
            contact: orderDetails.phoneNumber || "9999999999",
          },
          theme: {
            color: "#3399cc",
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
      setOrderPlaced(true);

      console.error('Error placing order:', error);
      alert('An error occurred while placing the order.');
    }
  };

  const updateDeliveryStatus = async (orderId) => {
    try {
      // Update delivery status to mark as "Order Confirmed"
      await axios.post(`http://localhost:5000/api/delivery/update-order-confirmed/${orderId}`);
      console.log('Delivery status updated for order:', orderId);
    } catch (error) {
      console.error('Error updating delivery status:', error);
      // Handle error appropriately, like showing an alert message
    }
  };

  const handleGetBill = () => {
    navigate('/bill');
    // Handle get bill logic here
    alert('Get Bill functionality goes here');
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
                  {item.productName} - Quantity: {item.quantity} - Price: {item.price}
                </li>
              ))}
          </ul>
        </div>

        <div className="total-amount">
          {orderDetails && orderDetails.totalAmount && (
            <div>
              <strong>Total Amount:</strong> {orderDetails.totalAmount}
            </div>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          {/* Conditionally render the "Place Order" button */}
          {!orderPlaced && (
            <button onClick={handlePlaceOrder} className="place-order-button">
              Place Order
            </button>
          )}
          {/* Conditionally render the "Get Bill" button after order placement */}
          {orderPlaced && (
            <button onClick={handleGetBill} className="get-bill-button">
              Get Bill
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;