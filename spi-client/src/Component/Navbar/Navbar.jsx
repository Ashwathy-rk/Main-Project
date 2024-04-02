import React, { useState, useEffect } from 'react';
import { IconButton, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { logout } from '../../redux/userSlice';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout({ userid: '', useremail: '' }));
    navigate('/', { replace: true }, { redirect: true });
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <AppBar position="static" sx={{ background: 'black', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', margin: '0' }}>
        <Button onClick={() => navigate('/')}>
          <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: 'white' }}>
            Home
          </Typography>
        </Button>

        <Button onClick={() => navigate('/contactus')}>
          <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: 'white' }}>
            Contact Us 
          </Typography>
        </Button>
        <Button onClick={handleGoBack} sx={{ fontSize: '15px', color: 'white' }}>
            Go Back
          </Button>

    
          
          <Button onClick={handleLogout} sx={{ fontSize: '15px', color: 'white' }}>
            Logout
          </Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
