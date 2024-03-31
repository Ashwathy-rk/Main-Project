import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddtoCart.css';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0); // State for total price
  const navigate = useNavigate();
  const { productId } = useParams(); // Fetch the product ID from the URL parameters

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/cart/${productId}`);
        setCart(response.data);
        // Initialize selectedQuantities object with default values for each item
        const quantities = {};
        response.data.items.forEach((item) => {
          quantities[item.product._id] = { grams: 0, kilograms: 0 }; // Separate quantities for grams and kilograms for each item
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

  const handleQuantityChange = (e, productId, quantityType) => {
    const { value } = e.target;
    setSelectedQuantities({
      ...selectedQuantities,
      [productId]: { ...selectedQuantities[productId], [quantityType]: value }
    });
  };

  const handleBuyNow = async () => {
    try {
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

        // Initialize total cost
        let totalAmount = 0;

        // Iterate over each item in the cart
        for (const itemId in selectedQuantities) {
            const grams = parseFloat(selectedQuantities[itemId].grams);
            const kilograms = parseFloat(selectedQuantities[itemId].kilograms);

            // Check if more than one quantity is selected
            if ((grams !== 0 && kilograms !== 0) || (grams === 'more' && kilograms !== 0) || (kilograms === 'more' && grams !== 0)) {
                alert('Please select only one quantity (either grams or kilograms) for each item.');
                return;
            }

            // Check if no quantity is selected
            if (grams === 0 && kilograms === 0) {
                alert('Please select a quantity for each item.');
                return;
            }

            let selectedQuantity = 0;
            if (grams !== 0) {
                selectedQuantity = grams / 1000; // Convert grams to kilograms
            } else {
                selectedQuantity = kilograms;
            }

            const item = cart.items.find(item => item.product._id === itemId);
            if (item) {
                const itemPrice = item.product.price;
                totalAmount += itemPrice * selectedQuantity;
            } else {
                console.error(`Item with ID ${itemId} not found in the cart.`);
            }
        }

        // Check if total cost is 0
        if (totalAmount === 0) {
            alert('Total cost cannot be zero for any item.');
            return;
        }

        // Prepare order details object
        const orderDetails = {
            items: cart.items.map(item => ({
                productName: item.product.productName,
                price: item.product.price,
                quantity: selectedQuantities[item.product._id].grams !== 0 ? selectedQuantities[item.product._id].grams / 1000 : selectedQuantities[item.product._id].kilograms,
                userId: userId,
                userName: userName,
            })),
            totalAmount: totalAmount.toFixed(2),
            orderDate: new Date(),
        };

        // Clear the entire cart after placing an order
        await axios.delete('http://localhost:5000/api/remove/clear-cart');

        // Navigate to the order confirmation page with orderDetails as state
        navigate(`/orderconfirmation/${productId}`, { state: { orderDetails } });
    } catch (error) {
        console.error('Error processing order:', error);
    }
};

  useEffect(() => {
    if (cart) {
      // Calculate total price when cart or selected quantities change
      const total = cart.items.reduce((acc, item) => {
        const gramsPrice = item.product.price * selectedQuantities[item.product._id].grams / 1000; // Convert grams to kilograms
        const kilogramsPrice = item.product.price * selectedQuantities[item.product._id].kilograms;
        return acc + gramsPrice + kilogramsPrice;
      }, 0);
      setTotalPrice(total.toFixed(2));
    }
  }, [cart, selectedQuantities]);

  if (!cart) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
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
              <p><strong>Quantity (Grams):</strong>
                <input
                  type="number"
                  value={selectedQuantities[item.product._id].grams}
                  onChange={(e) => handleQuantityChange(e, item.product._id, 'grams')}
                />
              </p>
              <p><strong>Quantity (Kilograms):</strong>
                <input
                  type="number"
                  value={selectedQuantities[item.product._id].kilograms}
                  onChange={(e) => handleQuantityChange(e, item.product._id, 'kilograms')}
                />
              </p>
            </div>
          </div>
          <div>
            <button onClick={() => handleRemoveItem(item.product._id)}>Remove</button>
          </div>
        </div>
      ))}
      <p><strong>Total Price:</strong> ${totalPrice}</p> {/* Display total price */}
      <button className="buy-now-button" onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default CartPage;