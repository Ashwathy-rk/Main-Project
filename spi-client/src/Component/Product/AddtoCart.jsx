// CartPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddtoCart.css';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart/cart");
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      console.log(productId)
      await axios.delete(`http://localhost:5000/api/remove/remove/${productId}`);
      const response = await axios.get("http://localhost:5000/api/cart/cart");
      setCart(response.data);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleBuyNow = async () => {
    try {
      console.log('Buy Now clicked');

      const orderItems = cart.items.map((item) => ({
        productName: item.product.productName,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const totalAmount = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

      const orderDetails = {
        items: orderItems,
        totalAmount: totalAmount.toFixed(2),
        orderDate: new Date(),
      };

      await axios.post('http://localhost:5000/api/order/order', orderDetails);

      // Clear the entire cart after placing an order
      await axios.delete('http://localhost:5000/api/remove/clear-cart');

      const response = await axios.get('http://localhost:5000/api/cart/cart');
      setCart(response.data);

      navigate('/orderconfirmation', {
        state: {
          orderDetails: orderDetails,
        },
      });
    } catch (error) {
      console.error('Error navigating to order confirmation page:', error);
    }
  };

  if (!cart) {
    return <div>Loading cart...</div>;
  }

  const totalAmount = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.items.map((item) => (
        <div key={item.product._id} className="cart-item">
          <p>Product: {item.product.productName}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleRemoveItem(item.product._id)}>Remove</button>
        </div>
      ))}
      <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
      <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default CartPage;
