import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderHistory.css'

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/ordering/ordering/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <div className="order-history-container">
    <h2 className="order-history-heading">Order History</h2>
    <ul className="order-list">
      {orders.map(order => (
        <li key={order._id} className="order-item">
          <div className="order-info">
            <div><strong>Order ID:</strong> {order._id}</div>
            <div><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</div>
            <div><strong>Total Amount:</strong> ${order.totalAmount}</div>
          </div>
          <div className="order-items">
            <strong>Order Items:</strong>
            <ul className="order-item-list">
              {order.items.map(item => (
                <li key={item.productId} className="order-item-detail">
                  {item.productName} - Quantity: {item.quantity} - Price: ${item.price}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
};

export default OrderHistory;