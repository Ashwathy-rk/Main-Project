// Moredetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Moredetails.css'


const MoreDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/moredetails/moredetails/${productId}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/add-to-cart/add-to-cart', {
        productId: productId,
        quantity: quantity,
      });

      console.log('Item added to cart:', response.data);
      alert(`Added ${quantity} items to cart.`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart. Please try again.');
    }
  };

  const handleOrderNow = () => {
    const totalCost = productDetails?.price * quantity;
  
    const orderDetails = {
      items: [
        {
          productName: productDetails?.productName,
          quantity,
          price: productDetails?.price,
        },
      ],
      totalAmount: totalCost,
    };
  
    navigate('/orderconfirmation', {
      state: {
        orderDetails: orderDetails,  // Ensure orderDetails is passed correctly
        productDetails: productDetails,
        quantity: quantity,
      },
    });
  };
  

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="more-details-container">
      <h2>Product Details</h2>
      <div className="product-details">
        <img
          src={`http://localhost:5000/get-product-image/get-product-image/get-product-image/${productDetails.productImage}`}
          alt={productDetails.productName}
          className="product-image"
        />
        <div className="details-info">
          <div>
            <strong>Product Name:</strong> {productDetails.productName}
          </div>
          <div>
            <strong>Provider:</strong> {productDetails.provider}
          </div>
          <div>
            <strong>Price:</strong> ${productDetails.price}
          </div>
          <div>
            <strong>Description:</strong> {productDetails.description}
          </div>
          <div className="quantity-container">
  <div className="quantity-label">Quantity:</div>
  <select value={quantity} onChange={handleQuantityChange} className="quantity-select">
    {[1, 2, 3, 4, 5].map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
</div>

        </div>
      </div>
      <div className="buttons-container">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="order-now-btn" onClick={handleOrderNow}>
          Order Now
        </button>
        <button className="go-back-btn" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default MoreDetails;