import React, { useState } from 'react';
import axios from 'axios';

const LicenseRequestForm = () => {
  const [formData, setFormData] = useState({
    dealerName: '',
    dealerEmail: '',
    tradeCode: '',
    address: '',
    shopLicenseNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API
      const response = await axios.post('http://localhost:5000/api/licenserequest/licenserequest', formData);

      // Handle the response (e.g., show a success message)
      console.log('Response from server:', response.data);
      alert('License request submitted successfully!');
    } catch (error) {
      console.error('Error submitting license request:', error);
      alert('Failed to submit license request');
    }
  };

  return (
    <div>
      <h2>License Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dealerName">Dealer Name:</label>
          <input
            type="text"
            id="dealerName"
            name="dealerName"
            value={formData.dealerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dealerEmail">Dealer Email:</label>
          <input
            type="email"
            id="dealerEmail"
            name="dealerEmail"
            value={formData.dealerEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="tradeCode">Trade Code:</label>
          <input
            type="text"
            id="tradeCode"
            name="tradeCode"
            value={formData.tradeCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="shopLicenseNumber">Shop License Number:</label>
          <input
            type="text"
            id="shopLicenseNumber"
            name="shopLicenseNumber"
            value={formData.shopLicenseNumber}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default LicenseRequestForm;
