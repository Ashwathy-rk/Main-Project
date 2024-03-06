import React from 'react'
import Layout from './AdminLayout'
import { Box } from '@mui/material'

function AdminHome() {
  return (
    <div>
      <Layout/>
      <Box
        ml={{ sm: 0, md: '250px' }} // Adjust the margin based on the sidebar width
        transition="margin 0s"
      >
   
    </Box>
    </div> 
  )
} 

export default AdminHome 
