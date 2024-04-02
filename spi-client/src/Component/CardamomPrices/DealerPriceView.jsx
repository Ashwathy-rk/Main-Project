import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayPrices = () => {
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const response = await axios.get(`http://localhost:5000/api/update-price/prices?date=${today}`);
        setPrices(response.data);
      } catch (error) {
        console.error('Error fetching prices:', error);
        setError('An error occurred while fetching prices');
      }
    };

    fetchPrices();
  }, []);

  const handleSellCardamom = (priceId, spiceCenterName, userId) => {
    navigate(`/sell-cardamom/${priceId}/${spiceCenterName}/${userId}`);
  };

  return (
    <div className="display-prices-container">
      <h2>Prices</h2>
      {error && <p className="error">{error}</p>}
      <div className="price-list">
        {prices.map((price) => (
          <div className="price-card" key={price._id}>
            <p>Date: {price.date}</p>
            <p>Highest Price: {price.highestPrice}</p>
            <p>Average Price: {price.averagePrice}</p>
            <p>Dealer Name: {price.dealerName}</p>
            <p>Spice Center Name: {price.spiceCenterName}</p>
            <p>Address: {`${price.address.area}, ${price.address.city}, ${price.address.state} - ${price.address.pinCode}`}</p>
            <button onClick={() => handleSellCardamom(price._id, price.spiceCenterName, price.userId)}>Sell Cardamom</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayPrices;
