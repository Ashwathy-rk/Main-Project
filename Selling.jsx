import React, { useState } from 'react';
import axios from 'axios';

const CardamomSaleForm = ({ closeModal }) => {
  const [amountInKg, setAmountInKg] = useState('');
  const [cardamomImage, setCardamomImage] = useState('');
  const [date, setDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Get current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split('T')[0];

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCardamomImage(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform client-side validation
      const currentDate = new Date().toISOString().split('T')[0];

      if (!date || date < currentDate) {
        setErrorMessage('Please select a valid future date.');
        setSuccessMessage('');
        return;
      }

      // Prepare a FormData object to handle file uploads
      const formData = new FormData();
      formData.append('amountInKg', amountInKg);
      formData.append('cardamomImage', e.target.cardamomImage.files[0]);
      formData.append('date', date);

      // Send a POST request to the server to add a new cardamom sale
      const response = await axios.post('http://localhost:5000/api/cardamomsale/cardamomsale', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('added successfully');


      setSuccessMessage(response.data.msg);
      setErrorMessage('');
      closeModal(); // Close the modal after successfully submitting the form
    } catch (error) {
      console.error('Error adding cardamom sale:', error);
      setErrorMessage('Failed to add cardamom sale. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="cardamom-sale-form-container">
      <h2>Add Cardamom Sale</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="amountInKg">Amount in Kg:</label>
          <input
            type="number"
            id="amountInKg"
            value={amountInKg}
            onChange={(e) => setAmountInKg(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardamomImage">Cardamom Image:</label>
          <input
            type="file"
            id="cardamomImage"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          {cardamomImage && <img src={cardamomImage} alt="Cardamom Preview" className="preview-image" />}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={currentDate}  
            required
          />
          {/* Context validation for date */}
          {errorMessage && !date && <p className="error-message">Please select a date.</p>}
          {errorMessage && date < currentDate && <p className="error-message">Please select a valid future date.</p>}
        </div>

        <button type="submit" className="submit-button">Add Cardamom Sale</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default CardamomSaleForm;
