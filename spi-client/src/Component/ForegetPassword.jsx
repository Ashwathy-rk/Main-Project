import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Use useNavigate

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      const formData = {
        email: email,
      };

      // Send a POST request to your backend API with the user's email
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('check your mail for otp');

        if (data.success === false) {
          console.log(data.message);
        } else {
          console.log(data.message);
          navigate("/otp"); // Use navigate to redirect to the reset-password page
        }
      } else {
        console.error("Failed to send the request."); // Log the error
      }

    } catch (error) {
      // Handle errors, display error message, or redirect to an error page
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
}

export default ForgotPassword;