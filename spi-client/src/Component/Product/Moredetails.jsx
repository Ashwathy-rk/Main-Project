import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Moredetails.css';

const MoreDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customQuantity, setCustomQuantity] = useState('');
  const [stock, setStock] = useState(0); // Added stock state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/moredetails/moredetails/${productId}`);
        setProductDetails(response.data);
        setStock(response.data.stock); // Assuming the server response includes a 'stock' property
        console.log(response.data.stock);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);



  
  const handleAddToCart = async () => {
    try {
      const selectedQuantity = customQuantity !== '' ? parseInt(customQuantity, 10) : quantity;

      const response = await axios.post('http://localhost:5000/api/add-to-cart/add-to-cart', {
        productId: productId,
        quantity: selectedQuantity,
      });

      console.log('Item added to cart:', response.data);
      alert(`Added ${selectedQuantity} items to cart.`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart. Please try again.');
    }
  };

  const handleOrderNow = () => {
    const totalCost = productDetails?.price * (customQuantity !== '' ? parseInt(customQuantity, 10) : quantity);

    const orderDetails = {
      items: [
        {
          productName: productDetails?.productName,
          quantity: customQuantity !== '' ? parseInt(customQuantity, 10) : quantity,
          price: productDetails?.price,
        },
      ],
      totalAmount: totalCost,
    };

    navigate(`/orderconfirmation/${productId}`, {  // Pass productId to the order confirmation page
      state: {
        orderDetails: orderDetails,
        productDetails: productDetails,
        quantity: customQuantity !== '' ? parseInt(customQuantity, 10) : quantity,
      },
    });
  };


  const handleGoBack = () => {
    navigate(-1);
  };

  const handleQuantityChange = (e) => {
    const selectedQuantity = e.target.value;
    setQuantity(selectedQuantity);

    // Clear custom quantity when selecting a predefined option
    if (selectedQuantity !== 'more') {
      setCustomQuantity('');
    }
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
          <div className="stock-info">
            <strong>Stock:</strong> {stock}
          </div>
          <div className="quantity-container">
          <div className="quantity-label">Quantity:</div>
          <select value={quantity} onChange={handleQuantityChange} className="quantity-select">
            {[1, 2, 3, 4, 5, 'more'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Show text field for custom quantity when 'more' is selected */}
          {quantity === 'more' && (
            <input
              type="text"
              placeholder="Enter quantity"
              value={customQuantity}
              onChange={(e) => setCustomQuantity(e.target.value)}
              className="custom-quantity-input"
            />
          )}
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