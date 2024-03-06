import React, { useState, useEffect } from 'react';
import { IconButton, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';

const LandNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout({ userid: '', useremail: '' }));
    navigate('/', { replace: true }, { redirect: true });
  };

  

  return (
    <AppBar position="static" sx={{ background: 'black', boxShadow: 'none' }}>
  <Toolbar sx={{ justifyContent: 'space-between', margin: '0' }}>
    <Button onClick={() => navigate('/')}>
      <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: theme.palette.secondary[100] }}>
        Home
      </Typography>
    </Button>

    <Button onClick={() => navigate('/shopview')}>
      <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: theme.palette.secondary[100] }}>
        View Parchers
      </Typography>
    </Button>
    <Button onClick={() => navigate('/dealerpriceview')}>
      <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: theme.palette.secondary[100] }}>
        Sell Cardamom
      </Typography>
    </Button>
    <Button onClick={() => navigate('/shopreg')}>
      <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: theme.palette.secondary[100] }}>
        EDit Profile
      </Typography>
    </Button>

    <div>
      <Button onClick={handleLogout} sx={{ fontSize: '15px', color: theme.palette.secondary[100] }}>
        Logout
      </Button>
    </div>
  </Toolbar>
</AppBar>

  );
};

export default LandNavbar;