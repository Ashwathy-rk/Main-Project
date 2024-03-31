import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/ordering/ordering/${userId}`);
        const ordersWithStatus = await Promise.all(response.data.map(async order => {
          const deliveryStatus = await fetchDeliveryStatus(order._id);
          return { ...order, ...deliveryStatus };
        }));
        setOrders(ordersWithStatus);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchDeliveryStatus = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/delivery/${orderId}`);
      return response.data[0]; // Assuming only one delivery status associated with an order
    } catch (error) {
      console.error('Error fetching delivery status:', error);
      return null;
    }
  };

  const getStatusLabel = (order) => {
    if (order.delivered) {
      return 'Delivered';
    } else if (order.shipped) {
      return 'In Transit';
    } else if (order.orderConfirmed) {
      return 'Confirmed';
    } else {
      return 'Pending';
    }
  };

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
            <div className="delivery-status">
              <strong>Delivery Status:</strong>
              <ul>
                <li className={order.orderConfirmed ? 'confirmed' : ''}>Order Confirmed: {order.orderConfirmed ? 'Yes' : 'No'}</li>
                <li className={order.shipped ? 'in-transit' : ''}>In Transit: {order.shipped ? 'Yes' : 'No'}</li>
                <li className={order.delivered ? 'delivered' : ''}>Delivered: {order.delivered ? 'Yes' : 'No'}</li>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
