import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'

const Register2 = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate input on change
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    const updatedErrors = { ...errors };

    switch (name) {
      case 'name':
        // Validate Name (only alphabet, not empty)
        if (!value.trim()) {
          updatedErrors[name] = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          updatedErrors[name] = 'Name should contain only alphabets';
        } else {
          delete updatedErrors[name];
        }
        break;
      case 'username':
        // Validate Username (not empty)
        if (!value.trim()) {
          updatedErrors[name] = 'Username is required';
        } else {
          delete updatedErrors[name];
        }
        break;
      case 'email':
        // Validate Email (should be a Gmail address, not empty)
        if (!value.trim()) {
          updatedErrors[name] = 'Email is required';
        } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
          updatedErrors[name] = 'Please enter a valid Gmail address';
        } else {
          delete updatedErrors[name];
        }
        break;
      case 'password':
        // Validate Password (at least 8 characters, not empty)
        if (!value.trim()) {
          updatedErrors[name] = 'Password is required';
        } else if (value.length < 8) {
          updatedErrors[name] = 'Password should contain at least 8 characters';
        } else {
          delete updatedErrors[name];
        }
        break;
      case 'confirmPassword':
        // Validate Confirm Password (matches Password, not empty)
        if (!value.trim()) {
          updatedErrors[name] = 'Confirm Password is required';
        } else if (value !== formData.password) {
          updatedErrors[name] = 'Passwords do not match';
        } else {
          delete updatedErrors[name];
        }
        break;
      case 'address':
        // Validate Address (not empty)
        if (!value.trim()) {
          updatedErrors[name] = 'Address is required';
        } else {
          delete updatedErrors[name];
        }
        break;
      default:
        break;
    }

    setErrors(updatedErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors before submitting
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/register2', formData);
        console.log(response.data);
        alert(response.data.msg);
      } catch (error) {
        console.error(error);
        alert('An error occurred during registration');
      }
    }
  };

  return (
    <div className="shop-registration-container">
    <div className="container mt-5">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register2;
