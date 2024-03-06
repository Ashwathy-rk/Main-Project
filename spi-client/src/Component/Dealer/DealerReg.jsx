import React, { useState } from 'react';
import axios from 'axios';
import './DealerRegistration.css';

const DealerRegistration = () => {
  const [formData, setFormData] = useState({
    dealerName: '',
    dealerLicense: null,
    dealerEmail: '',
    dealerLocation: '',
  });

  const [errors, setErrors] = useState({
    dealerName: '',
    dealerLicense: '',
    dealerEmail: '',
    dealerLocation: '',
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    validateInput(e.target.name, e.target.value);
  };

  const validateInput = (name, value) => {
    switch (name) {
      case 'dealerName':
        setErrors((prevErrors) => ({
          ...prevErrors,
          dealerName: value.length < 3 ? 'Dealer name must be at least 3 characters long' : '',
        }));
        break;
      case 'dealerLicense':
        // Add your validation logic for the file
        setErrors((prevErrors) => ({
          ...prevErrors,
          dealerLicense: '', // Clear the error for file
        }));
        break;
      case 'dealerEmail':
        setErrors((prevErrors) => ({
          ...prevErrors,
          dealerEmail: !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid email address' : '',
        }));
        break;
      case 'dealerLocation':
        setErrors((prevErrors) => ({
          ...prevErrors,
          dealerLocation: value.length < 3 ? 'Dealer location must be at least 3 characters long' : '',
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const isValid = Object.values(errors).every((error) => !error);

    if (!isValid) {
      console.error('Form has errors. Please correct them before submitting.');
      return;
    }

    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post('http://localhost:5000/api/dealerreg/dealerreg', formDataToSend, {
        headers: {
          // Remove Content-Type header, as it will be set automatically by FormData
        },
      });

      if (response.data && response.data.msg === 'Dealer registration successful') {
        alert(response.data.msg);
        // Redirect or perform additional actions after successful registration
      } else {
        alert('Dealer registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during dealer registration');
    }
  };

  return (
    <div className="dealer-registration-container">
      <div className="registration-form-container">
        <h2>Dealer Registration</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="dealerName">Dealer Name:</label>
            <input type="text" id="dealerName" name="dealerName" value={formData.dealerName} onChange={handleChange} required />
            {errors.dealerName && <span className="error">{errors.dealerName}</span>}
          </div>
          <div>
            <label htmlFor="dealerLicense">Dealer License (File):</label>
            <input type="file" id="dealerLicense" name="dealerLicense" onChange={handleChange} accept=".pdf, .doc, .docx" required />
            {errors.dealerLicense && <span className="error">{errors.dealerLicense}</span>}
          </div>
          <div>
            <label htmlFor="dealerEmail">Dealer Email:</label>
            <input type="email" id="dealerEmail" name="dealerEmail" value={formData.dealerEmail} onChange={handleChange} required />
            {errors.dealerEmail && <span className="error">{errors.dealerEmail}</span>}
          </div>
          <div>
            <label htmlFor="dealerLocation">Dealer Location:</label>
            <input type="text" id="dealerLocation" name="dealerLocation" value={formData.dealerLocation} onChange={handleChange} required />
            {errors.dealerLocation && <span className="error">{errors.dealerLocation}</span>}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default DealerRegistration;
