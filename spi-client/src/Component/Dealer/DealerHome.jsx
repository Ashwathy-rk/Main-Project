import React from 'react'
import Layout from './DealerLayout'
import { Box } from '@mui/material'

function DealerHome() {
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

export default DealerHome
