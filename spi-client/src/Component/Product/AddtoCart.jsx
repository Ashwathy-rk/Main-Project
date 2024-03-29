import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddtoCart.css';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [quantityType, setQuantityType] = useState('grams'); // Default quantity type
  const navigate = useNavigate();
  const { productId } = useParams(); // Fetch the product ID from the URL parameters

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/cart/${productId}`);
        setCart(response.data);
        // Initialize selectedQuantities object with default values
        const quantities = {};
        response.data.items.forEach((item) => {
          quantities[item.product._id] = { grams: 0, kilograms: 0 };
        });
        setSelectedQuantities(quantities);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [productId]);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/remove/remove/${productId}`);
      const response = await axios.get(`http://localhost:5000/api/cart/cart/${productId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleQuantityChange = (e, productId) => {
    const { value, name } = e.target;
    setSelectedQuantities({
      ...selectedQuantities,
      [productId]: { ...selectedQuantities[productId], [name]: value }
    });
  };

  const handleBuyNow = async () => {
    try {
      console.log('Buy Now clicked');
      // Fetch userId and userName from localStorage
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('username');
  
      if (!userId || !userName) {
        console.error('User details not found in localStorage.');
        return;
      }
  
      if (!cart || !cart.items || cart.items.length === 0) {
        console.error('No items in the cart.');
        return;
      }
  
      const orderItems = cart.items.map((item) => ({
        productName: item.product.productName,
        price: item.product.price,
        quantity: quantityType === 'grams' ? selectedQuantities[item.product._id].grams : selectedQuantities[item.product._id].kilograms,
        userId: userId,
        userName: userName,
      }));
  
      // Check if orderItems is empty
      if (orderItems.length === 0) {
        console.error('No items in orderItems.');
        return;
      }
  
      const totalAmount = cart.items.reduce((total, item) => {
        const quantity = quantityType === 'grams' ? selectedQuantities[item.product._id].grams : selectedQuantities[item.product._id].kilograms;
        return total + item.product.price * quantity;
      }, 0);
  
      const orderDetails = {
        items: orderItems,
        totalAmount: totalAmount.toFixed(2),
        orderDate: new Date(),
      };
      // Clear the entire cart after placing an order
      await axios.delete('http://localhost:5000/api/remove/clear-cart');
  
      const response = await axios.get(`http://localhost:5000/api/cart/cart/${productId}`);
      setCart(response.data);
  
      navigate(`/orderconfirmation/${productId}`, {
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

  const totalAmount = cart.items.reduce((total, item) => {
    const quantity = quantityType === 'grams' ? selectedQuantities[item.product._id].grams : selectedQuantities[item.product._id].kilograms;
    return total + item.product.price * quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div>
        <label>
          <input
            type="radio"
            name="quantityType"
            value="grams"
            checked={quantityType === 'grams'}
            onChange={(e) => setQuantityType(e.target.value)}
          />
          Grams
        </label>
        <label>
          <input
            type="radio"
            name="quantityType"
            value="kilograms"
            checked={quantityType === 'kilograms'}
            onChange={(e) => setQuantityType(e.target.value)}
          />
          Kilograms
        </label>
      </div>
      {cart.items.map((item) => (
        <div key={item.product._id} className="cart-item">
          <div className="product-details">
            <img
              src={`http://localhost:5000/get-product-image/get-product-image/get-product-image/${item.product.productImage}`}
              alt={item.product.productName}
              className="product-image"
            />
            <div>
              <p><strong>Product:</strong> {item.product.productName}</p>
              <p><strong>Price:</strong> {item.product.price}</p>
              <p><strong>Quantity:</strong>
                <input
                  type="number"
                  value={quantityType === 'grams' ? selectedQuantities[item.product._id].grams : selectedQuantities[item.product._id].kilograms}
                  name={quantityType}
                  onChange={(e) => handleQuantityChange(e, item.product._id)}
                />
              </p>
            </div>
          </div>
          <div>
            <button onClick={() => handleRemoveItem(item.product._id)}>Remove</button>
          </div>
        </div>
      ))}
      <p className="total-amount">Total Amount: {totalAmount.toFixed(2)}</p>
      <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default CartPage;
