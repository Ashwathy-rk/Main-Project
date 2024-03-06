import React, { useState, useEffect } from 'react';
import {
  LightModeOutlined,
  DarkModeOutlined,
  SettingsOutlined,
  Menu as MenuIcon,
  Search,
  ArrowDropDownOutlined,
} from '@mui/icons-material';
import FlexBetween from '../FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../../state/index';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { logout } from '../../redux/userSlice';

const SpicesNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout({ userid: '', useremail: '' }));
    navigate('/', { replace: true }, { redirect: true });
  };

  useEffect(() => {
    const userDataString = localStorage.getItem('user');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUsername(userData.user.name);
    } else {
      console.error('User data not found in local storage');
    }
  }, []);

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <FlexBetween flex={1}>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            sx={{
              visibility: isSidebarOpen ? 'hidden' : 'visible',
              opacity: isSidebarOpen ? 0 : 1,
              transition: 'visibility 0s linear 0.3s, opacity 0.3s',
            }}
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'light' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>

          {username && (
            <FlexBetween>
              <Button
                onClick={handleClick}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textTransform: 'none',
                  gap: '1rem',
                }}
              >
                {/* <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    Welcome, {username}
                  </Typography>
                </Box> */}
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary[300], fontSize: '25px' }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <MenuItem onClick={handleClose}>
                  <IconButton sx={{ fontSize: '15px' }} onClick={handleLogout}>
                    Logout
                  </IconButton>
                </MenuItem>
              </Menu>
            </FlexBetween>
          )}

          <Box>
            <IconButton onClick={handleLogout} sx={{ fontSize: '14px' }}>
              Logout
            </IconButton>
          </Box>

          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default SpicesNavbar;
