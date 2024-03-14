// components/OrderHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    axios.get(`http://localhost:5000/api/orderhis/orderhis?userId=${userId}`)
      .then(response => {
        console.log('Orders:', response.data.orders); // Log received orders
        setOrders(response.data.orders);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <div>
      <h2>Your Order History</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Total Amount: ${order.totalAmount}</p>
            <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
            <p>Items:</p>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>
                  <p>Product Name: {item.productName}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
