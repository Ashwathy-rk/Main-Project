import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Moredetails.css';

const MoreDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [grams, setGrams] = useState(0);
  const [kilograms, setKilograms] = useState(0);
  const [customQuantity, setCustomQuantity] = useState('');
  const [stock, setStock] = useState(0); // Added stock state
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('productId', productId);
  }, [productId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/moredetails/moredetails/${productId}`);
        setProductDetails(response.data);
        setStock(response.data.stock); // Assuming the server response includes a 'stock' property
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const selectedQuantity = customQuantity !== '' ? parseInt(customQuantity, 10) : quantity;

      const response = await axios.post(`http://localhost:5000/api/add-to-cart/add-to-cart/${productId}`, {
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
    // Check if both grams and kilograms are selected
    if ((grams !== 0 && kilograms !== 0) || (grams === 'more' && kilograms !== 0) || (kilograms === 'more' && grams !== 0)) {
      alert('Please select only one quantity (either grams or kilograms).');
      return;
    }
  
    // Check if no quantity is selected
    if (grams === 0 && kilograms === 0 && customQuantity === '') {
      alert('Please select a quantity.');
      return;
    }
  
    let selectedQuantity = 0;
    if (customQuantity !== '') {
      selectedQuantity = parseFloat(customQuantity);
    } else if (grams !== 0) {
      selectedQuantity = grams / 1000; // Convert grams to kilograms
    } else {
      selectedQuantity = kilograms;
    }
  
    const totalCost = productDetails?.price * selectedQuantity;
  
    // Check if total cost is 0
    if (totalCost === 0) {
      alert('Total cost cannot be zero.');
      return;
    }
  
    const orderDetails = {
      items: [
        {
          productName: productDetails?.productName,
          quantity: selectedQuantity, // Update to use selected quantity directly
          price: productDetails?.price,
        },
      ],
      totalAmount: totalCost,
    };
  
    navigate(`/orderconfirmation/${productId}`, {
      state: {
        orderDetails: orderDetails,
        productDetails: productDetails,
      },
    });
  };
  

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGramsChange = (e) => {
    setGrams(e.target.value);
    // Reset kilograms to 0 when grams are selected
    setKilograms(0);
  };

  const handleKilogramsChange = (e) => {
    setKilograms(e.target.value);
    // Reset grams to 0 when kilograms are selected
    setGrams(0);
  };


  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background-container">
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
              <strong>Price:</strong> {productDetails.price}
            </div>
            <div>
              <strong>Description:</strong> {productDetails.description}
            </div>
            <div className="stock-info">
              <strong>Stock:</strong> {stock}
            </div>
            
            <div className="quantity-container">
              <div className="quantity-label">Quantity (in grams):</div>
              <select value={grams} onChange={handleGramsChange} className="quantity-select">
                {[0, 50, 100, 150, 200, 250].map((option) => (
                  <option key={option} value={option}>
                    {option === 0 ? 'Select grams' : option}
                  </option>
                ))}
                <option value="more" disabled={kilograms !== 0}>more</option>
              </select>
              {/* Show text field for custom quantity when 'more' is selected */}
              {grams === 'more' && (
                <input
                  type="number"
                  placeholder="Enter grams"
                  value={customQuantity}
                  onChange={(e) => setCustomQuantity(e.target.value)}
                  className="custom-quantity-input"
                />
              )}
            </div>
            <div className="quantity-container">
              <div className="quantity-label">Quantity (in kilograms):</div>
              <select value={kilograms} onChange={handleKilogramsChange} className="quantity-select">
                {[0, 1, 2, 3, 4, 5].map((option) => (
                  <option key={option} value={option}>
                    {option === 0 ? 'Select kilograms' : option}
                  </option>
                ))}
                <option value="more" disabled={grams !== 0}>more</option>
              </select>
              {/* Show text field for custom quantity when 'more' is selected */}
              {kilograms === 'more' && (
                <input
                  type="number"
                  placeholder="Enter kilograms"
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
    </div>
  );
};

export default MoreDetails;
