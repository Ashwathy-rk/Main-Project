import React, { useState, useEffect } from 'react';
import { IconButton, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link component
import { logout } from '../../redux/userSlice';

const CustomNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');

  useEffect(() => {
    // Retrieve productId from localStorage
    const storedProductId = localStorage.getItem('productId');
    setProductId(storedProductId);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout({ userid: '', useremail: '' }));
    navigate('/', { replace: true }, { redirect: true });
  };

  return (
    <AppBar position="static" sx={{ background: 'black', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', margin: '0' }}>
        <Button component={Link} to="/">
          <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: theme.palette.secondary[100] }}>
            Home
          </Typography>
        </Button>

        <Button component={Link} to="/productview">
          <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: theme.palette.secondary[100] }}>
            View Products
          </Typography>
        </Button>
        <Button component={Link} to={`/addtocart/${productId}`}>
          <Typography fontWeight="bold" fontSize="1.0rem" sx={{ color: theme.palette.secondary[100] }}>
            Your Cart
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

export default CustomNavbar;
