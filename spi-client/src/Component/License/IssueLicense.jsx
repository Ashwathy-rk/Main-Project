// components/LicenseRequestDisplay.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const LicenseRequestDisplay = () => {
  const [licenseRequests, setLicenseRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/getlicense/getlicense'); // Update the URL here
          setLicenseRequests(response.data);
        } catch (error) {
          console.error('Error fetching license requests:', error);
        }
      };
      

    fetchData();
  }, []);

  const generatePDF = async (requestId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/generatelicense/generatelicense/${requestId}`, {
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `license_${requestId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating license PDF:', error);
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {licenseRequests.map((request) => (
          <Grid item key={request._id} xs={12} sm={6} md={4} lg={3}>
            <Card id={`licenseCard_${request._id}`}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {request.dealerName}
                </Typography>
                <Typography color="text.secondary">{request.dealerEmail}</Typography>
                <Typography color="text.secondary">{request.tradeCode}</Typography>
                <Typography color="text.secondary">{request.address}</Typography>
                <Typography color="text.secondary">{request.shopLicenseNumber}</Typography>
                <Link to="#" onClick={() => generatePDF(request._id)}>
                  <Button variant="outlined" color="success">
                    Generate License
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LicenseRequestDisplay;
