// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Import your CSS file
import { useUser } from '../UseContext'; // Correct the path

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUserContext } = useUser(); // Use the correct hook

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });

      if (response.data && response.data.msg === 'Login Successful') {
        alert(response.data.msg);
        console.log(response.data);

        setUserContext(response.data.user);

        if (response.data.user.user.role === 'customer') {
          navigate('/customer');
        } else if (response.data.user.user.role === 'admin') {
          navigate('/admin');
        } else if (response.data.user.user.role === 'landowner') {
          navigate('/landowner');
        } else if (response.data.user.user.role === 'parcher') {
          navigate('/parcher');
        } else if (response.data.user.user.role === 'dealer') {
          navigate('/dealer');
        } 

        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('role',JSON.stringify(response.data.user.user.role));
        localStorage.setItem('loggedDealer', response.data.user.dealer);
        localStorage.setItem('loggedEmail', response.data.user.email);

        console.log('response',response.data.user.user.role)
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
        <p>
          <Link to="/forgetpassword">Forgot Password?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
