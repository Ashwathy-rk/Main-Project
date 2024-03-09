import React, { useState, useEffect } from 'react';
import { IconButton, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';

const DealerNav = ({ isSidebarOpen, setIsSidebarOpen }) => {
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

    <Button onClick={() => navigate('/products')}>
      <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: theme.palette.secondary[100] }}>
        Add your Products on website
      </Typography>
    </Button>
    <Button onClick={() => navigate('/dealerpriceadd')}>
      <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: theme.palette.secondary[100] }}>
        Add Cardamom Price To Landowners
      </Typography>
    </Button>
    <Button onClick={() => navigate('/shopreg')}>
      <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: theme.palette.secondary[100] }}>
        EDit Profile
      </Typography>
    </Button>
    <Button onClick={() => navigate('/spices')}>
      <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: theme.palette.secondary[100] }}>
        Spices Board Interface
      </Typography>
    </Button>
    <Button onClick={() => navigate('/saleview')}>
      <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: theme.palette.secondary[100] }}>
        View Cardamom Sale
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

export default DealerNav;