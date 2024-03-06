// PriceForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PriceForm = () => {
  const [priceData, setPriceData] = useState({
    date: '',
    maxPrice: 0,
    avgPrice: 0,
    dealerName: '',
    dealerLocation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPriceData({ ...priceData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/addprice/addprice', priceData);
      console.log('Price added successfully');
      alert('Price added successfully');
    } catch (error) {
      console.error('Error adding price:', error);
    }
  };

  return (
    <div>
      <h2>Add Price</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={priceData.date} onChange={handleChange} required />
        <label>Max Price:</label>
        <input type="number" name="maxPrice" value={priceData.maxPrice} onChange={handleChange} required />
        <label>Avg Price:</label>
        <input type="number" name="avgPrice" value={priceData.avgPrice} onChange={handleChange} required />
        <label>Dealer Name:</label>
        <input type="text" name="dealerName" value={priceData.dealerName} onChange={handleChange} required />
        <label>Dealer Location:</label>
        <input type="text" name="dealerLocation" value={priceData.dealerLocation} onChange={handleChange} required />
        <button type="submit">Add Price</button>
      </form>
    </div>
  );
};

export default PriceForm;
