import React ,{ useState }from 'react'
import { Box, useMediaQuery } from "@mui/material"
import { Outlet } from 'react-router-dom';

import Navbar from './DealerNavbar';
import Sidebar from './DealerSidebar';

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-widtth: 600px)");
  const [isSidebarOpen,setIsSidebarOpen]= useState(true);
   
  
  return (
    <div>
    <Box display={isNonMobile ? "flex":"block"} width="50%" height="100%">
      <Sidebar 
  
      isNonMobile={isNonMobile}
      drawerwidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box>
      <Navbar
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}/>
      <Outlet />
    </Box>

  </Box> 
  </div>
  );
  
};

export default Layout