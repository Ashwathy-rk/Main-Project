import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook

const SellCardamomForm = () => {
  const [priceId, setPriceId] = useState('');
  const [userId, setUserId] = useState('');
  const [spiceCenterName, setSpiceCenterName] = useState('');
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [image, setImage] = useState(null);
  const [landownersName, setLandownersName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for Phone Number
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Fetching params from URL
  const { priceId: urlPriceId, userId: urlUserId, spiceCenterName: urlSpiceCenterName } = useParams();

  useEffect(() => {
    // Set the priceId and spiceCenterName from the URL params
    setPriceId(urlPriceId);
    setUserId(urlUserId);
    setSpiceCenterName(urlSpiceCenterName);
  }, [urlPriceId, urlUserId, urlSpiceCenterName]); // Make sure to include URL params in dependency array

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('priceId', priceId);
      formData.append('userId', userId);
      formData.append('spiceCenterName', spiceCenterName);
      formData.append('name', name);
      formData.append('image', image);
      formData.append('landownersName', landownersName);
      formData.append('phoneNumber', phoneNumber);
      formData.append('quantity', quantity);
      
      // Add today's date to the form data
      const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
      formData.append('date', today);
  
      const response = await axios.post('http://localhost:5000/api/selling/sell-cardamom', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Cardamom sold successfully:', response.data);
      setSuccess(true);
    } catch (error) {
      console.error('Error selling cardamom:', error);
      setError('An error occurred while selling cardamom');
    }
  };
  


  return (
    <div className="sell-cardamom-container">
      <form className="sell-cardamom-form" onSubmit={handleSubmit}>
        <h2>Sell Cardamom</h2>
        {success && <p className="success">Cardamom sold successfully!</p>}
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="spiceCenterName">Spice Center Name</label>
          <input type="text" id="spiceCenterName" value={spiceCenterName} readOnly required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} readOnly required />
        </div>
        <div className="form-group">
          <label htmlFor="landownersName">Landowner's Name</label>
          <input
            type="text"
            id="landownersName"
            value={landownersName}
            onChange={(e) => setLandownersName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity of Cardamom (kg)</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <button type="submit" className="btn">
          Sell Cardamom
        </button>
      </form>
    </div>
  );
};

export default SellCardamomForm;
