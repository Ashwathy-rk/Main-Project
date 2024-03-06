import React, { useState } from 'react';
import axios from 'axios';

const AuctionForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    auctioneer: '',
    numberOfLots: 0,
    totalQtyArrived: 0,
    qtySold: 0,
    maxPrice: 0,
    avgPrice: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the server
      const response = await axios.post('http://localhost:5000/api/addauction/addauction', formData);

      // Handle success or display a message
      console.log(response.data);
      alert('Auction details added successfully!');
      
      // Clear the form after successful submission
      setFormData({
        date: '',
        auctioneer: '',
        numberOfLots: 0,
        totalQtyArrived: 0,
        qtySold: 0,
        maxPrice: 0,
        avgPrice: 0,
      });
    } catch (error) {
      console.error('Error adding auction details:', error);
      alert('Failed to add auction details');
    }
  };

  return (
    <div>
      <h2>Auction Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="auctioneer">Auctioneer:</label>
          <input type="text" id="auctioneer" name="auctioneer" value={formData.auctioneer} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="numberOfLots">Number of Lots:</label>
          <input type="number" id="numberOfLots" name="numberOfLots" value={formData.numberOfLots} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="totalQtyArrived">Total Quantity Arrived (Kgs):</label>
          <input type="number" id="totalQtyArrived" name="totalQtyArrived" value={formData.totalQtyArrived} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="qtySold">Quantity Sold (Kgs):</label>
          <input type="number" id="qtySold" name="qtySold" value={formData.qtySold} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="maxPrice">Max Price (Rs./Kg):</label>
          <input type="number" id="maxPrice" name="maxPrice" value={formData.maxPrice} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="avgPrice">Average Price (Rs./Kg):</label>
          <input type="number" id="avgPrice" name="avgPrice" value={formData.avgPrice} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuctionForm;
