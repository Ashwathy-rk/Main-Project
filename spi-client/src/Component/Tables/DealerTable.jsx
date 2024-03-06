import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const DealerTable = () => {
  const [dealers, setDealers] = useState([]);

  const handleApproval = async (dealerId, currentStatus) => {
    console.log('Handling approval:', dealerId, currentStatus);
    try {
      const newStatus = !currentStatus;

      // Update the approval status in the state
      setDealers((prevDealers) =>
        prevDealers.map((dealer) =>
          dealer._id === dealerId ? { ...dealer, approved: newStatus } : dealer
        )
      );

      // Update the approval status in the database
      const response = await axios.patch(`http://localhost:5000/api/approvedealer/approvedealer/${dealerId}`, {
        approved: newStatus,
      });

      console.log('Patch Response: Approval status updated successfully');
    } catch (error) {
      console.error('Error updating dealer approval status:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dealertable/dealertable');
        setDealers(response.data);
      } catch (error) {
        console.error('Error fetching dealers:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Dealer Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Approval Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dealers.map((dealer) => (
            <TableRow key={dealer._id}>
              <TableCell>{dealer._id}</TableCell>
              <TableCell>{dealer.dealerName}</TableCell>
              <TableCell>{dealer.dealerEmail}</TableCell>
              <TableCell>{dealer.dealerLocation}</TableCell>
              <TableCell>
                {dealer.approved ? 'Approved' : 'Pending Approval'}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleApproval(dealer._id, dealer.approved)}
                  variant="contained"
                  color={dealer.approved ? 'secondary' : 'primary'}
                >
                  {dealer.approved ? 'Disapprove' : 'Approve'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DealerTable;
