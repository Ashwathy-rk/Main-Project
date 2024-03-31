import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ordertable/ordertable');
        console.log('Orders:', response.data); // Log the data
        
        // Fetch initial delivery status for each order
        const initializedOrders = await Promise.all(
          response.data.map(async order => {
            const deliveryResponse = await axios.get(`http://localhost:5000/api/delivery/${order._id}`);
            const deliveryStatus = deliveryResponse.data[0]; // Assuming only one delivery status is associated with an order
            return {
              ...order,
              orderConfirmed: deliveryStatus ? deliveryStatus.orderConfirmed || false : false,
              shipped: deliveryStatus ? deliveryStatus.shipped || false : false,
              delivered: deliveryStatus ? deliveryStatus.delivered || false : false
            };
          })
        );
        setOrders(initializedOrders); // Set orders with data from the server
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleCheckboxChange = async (orderId, status, checked) => {
    try {
      // Optimistically update local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, [status.toLowerCase()]: checked } : order
        )
      );

      // Send update to the server
      await axios.post(`http://localhost:5000/api/delivery/${orderId}`, { status: status });
    } catch (error) {
      console.error('Error updating delivery status:', error);
      // If an error occurs, revert the local state to its previous state by refetching the orders
      fetchOrders();
    }
  };

  return (
    <div className="container">
      <h2>Order Table Page</h2>
      {orders.map(order => (
        <div key={order._id} className="order">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
          <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          {order.items.length > 0 ? (
            <>
              <p><strong>User Name:</strong> {order.items[0].userName}</p>
              <p><strong>User ID:</strong> {order.items[0].userId}</p>
            </>
          ) : (
            <p><em>No items in this order</em></p>
          )}
          <div className="items">
            <p><strong>Items:</strong></p>
            <ul>
              {order.items.map(item => (
                <li key={item._id}>
                  {item.productName} - Quantity: {item.quantity} - Price: ${item.price}
                </li>
              ))}
            </ul>
          </div>
          <div className="delivery-status-checkboxes">
            <p><strong>Delivery Status:</strong></p>
            <label>
              <input 
                type="checkbox" 
                checked={order.orderConfirmed} 
                onChange={(e) => handleCheckboxChange(order._id, 'Order Confirmed', e.target.checked)} 
              />
              Order Confirmed
            </label>
            <br />
            <label>
              <input 
                type="checkbox" 
                checked={order.shipped} 
                onChange={(e) => handleCheckboxChange(order._id, 'Shipped', e.target.checked)} 
              />
              Shipped
            </label>
            <br />
            <label>
              <input 
                type="checkbox" 
                checked={order.delivered} 
                onChange={(e) => handleCheckboxChange(order._id, 'Delivered', e.target.checked)} 
              />
              Delivered
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
