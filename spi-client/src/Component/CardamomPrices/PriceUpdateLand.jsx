import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdatePriceForm = () => {
  const [highestPrice, setHighestPrice] = useState('');
  const [averagePrice, setAveragePrice] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const dealerName = JSON.parse(localStorage.getItem('name'));
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [phoneNumber, setPhoneNumber] = useState('');
  const [spiceCenterName, setSpiceCenterName] = useState('');
  const [address, setAddress] = useState({
    area: '',
    city: '',
    state: '',
    pinCode: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data if user ID is available
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:5000/api/update-price/user/${userId}`);
          const { phoneNumber, spiceCenterName, address } = response.data;
          setPhoneNumber(phoneNumber);
          setSpiceCenterName(spiceCenterName);
          setAddress(address);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('An error occurred while fetching user data');
      }
    };

    fetchUserData();
    const formattedDate = new Date().toISOString().split('T')[0];
    setDate(formattedDate);
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/update-price/update-price', {
        userId,
        dealerName,
        highestPrice,
        averagePrice,
        date,
        phoneNumber,
        spiceCenterName,
        address
      });

      console.log('Price updated successfully:', response.data);
      navigate('/success');
    } catch (error) {
      console.error('Error updating price:', error);
      if (error.response && error.response.status === 400 && error.response.data.error === 'Data for this date already exists') {
        alert('Duplicate date entry detected. Please choose a different date.');
      } else {
        setError('An error occurred while updating the price');
      }
    }
  };

  return (
    <div className="update-price-container">
      <form className="update-price-form" onSubmit={handleSubmit}>
        <h2>Update Price</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="highestPrice">Highest Price</label>
          <input
            type="number"
            id="highestPrice"
            value={highestPrice}
            onChange={(e) => setHighestPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="averagePrice">Average Price</label>
          <input
            type="number"
            id="averagePrice"
            value={averagePrice}
            onChange={(e) => setAveragePrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dealerName">Dealer Name</label>
          <input
            type="text"
            id="dealerName"
            value={dealerName}
            readOnly
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="spiceCenterName">Spice Center Name</label>
          <input
            type="text"
            id="spiceCenterName"
            value={spiceCenterName}
            onChange={(e) => setSpiceCenterName(e.target.value)}
            required
          />
        </div>
        {Object.entries(address).map(([key, value]) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type="text"
              id={key}
              value={value}
              onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn">Update Price</button>
      </form>
    </div>
  );
};

export default UpdatePriceForm;
