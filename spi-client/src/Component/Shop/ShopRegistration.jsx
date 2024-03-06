import React, { useState } from 'react';
import axios from 'axios';
import './ShopRegistration.css';

const ShopRegistration = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    shopLicense: null,
    shopEmail: '',
    ownerName: '',
    licenseNumber: '',
    location: '',
    address: '',
    spiceCapacity: '',
    parchingPrice: '',
  });

  const [errors, setErrors] = useState({
    shopName: '',
    shopLicense: '',
    shopEmail: '',
    ownerName: '',
    licenseNumber: '',
    location: '',
    address: '',
    spiceCapacity: '',
    parchingPrice: '',
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
    // Validation logic similar to the DealerRegistration component
    // ...
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

      const response = await axios.post('http://localhost:5000/api/shopreg/shopreg', formDataToSend, {
        headers: {
          // Remove Content-Type header, as it will be set automatically by FormData
        },
      });

      if (response.data && response.data.msg === 'Shop registration successful') {
        alert(response.data.msg);
        // Redirect or perform additional actions after successful registration
      } else {
        alert('Shop registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during shop registration');
    }
  };

  return (
    <div className="shop-registration-container">
      <div className="registration-form-container">
        <h2>Shop Registration</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          {/* Your form fields and inputs here */}
          <div>
            <label htmlFor="shopName">Shop Name:</label>
            <input type="text" id="shopName" name="shopName" value={formData.shopName} onChange={handleChange} required />
            {errors.shopName && <span className="error">{errors.shopName}</span>}
          </div>
          <div>
            <label htmlFor="shopLicense">Shop License (File):</label>
            <input type="file" id="shopLicense" name="shopLicense" onChange={handleChange} accept=".pdf, .doc, .docx" required />
            {errors.shopLicense && <span className="error">{errors.shopLicense}</span>}
          </div>
          <div>
            <label htmlFor="shopEmail">Shop Email:</label>
            <input type="email" id="shopEmail" name="shopEmail" value={formData.shopEmail} onChange={handleChange} required />
            {errors.shopEmail && <span className="error">{errors.shopEmail}</span>}
          </div>
          <div>
            <label htmlFor="ownerName">Owner's Name:</label>
            <input type="text" id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleChange} required />
            {errors.ownerName && <span className="error">{errors.ownerName}</span>}
          </div>
          <div>
            <label htmlFor="licenseNumber">License Number:</label>
            <input type="text" id="licenseNumber" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required />
            {errors.licenseNumber && <span className="error">{errors.licenseNumber}</span>}
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
            {errors.location && <span className="error">{errors.location}</span>}
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div>
            <label htmlFor="spiceCapacity">Spice Capacity:</label>
            <input type="text" id="spiceCapacity" name="spiceCapacity" value={formData.spiceCapacity} onChange={handleChange} required />
            {errors.spiceCapacity && <span className="error">{errors.spiceCapacity}</span>}
          </div>
          <div>
            <label htmlFor="parchingPrice">Spice Capacity:</label>
            <input type="text" id="parchingPrice" name="parchingPrice" value={formData.parchingPrice} onChange={handleChange} required />
            {/* {errors.parchingPrice && <span className="error">{errors.parchingPrice}</span>} */}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default ShopRegistration;
