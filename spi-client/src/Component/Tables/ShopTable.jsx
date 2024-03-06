import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const ShopTable = () => {
  const [shops, setShops] = useState([]);

  const handleApproval = async (shopId, currentStatus) => {
    console.log('Handling approval:', shopId, currentStatus);
    try {
      const newStatus = !currentStatus;

      // Update the approval status in the state
      setShops((prevShops) =>
        prevShops.map((shop) =>
          shop._id === shopId ? { ...shop, approved: newStatus } : shop
        )
      );

      // Update the approval status in the database
      const response = await axios.patch(`http://localhost:5000/api/approve/approve/${shopId}`, {
  approved: newStatus,
});

    

      console.log('Patch Response: Approval status updated successfully');
    } catch (error) {
      console.error('Error updating shop approval status:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/shop/shop');
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
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
            <TableCell>Shop Name</TableCell>
            <TableCell>Shop License</TableCell>
            <TableCell>Owner Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>License Number</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Spice Capacity</TableCell>
            <TableCell>Approval Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shops.map((shop) => (
            <TableRow key={shop._id}>
              <TableCell>{shop._id}</TableCell>
              <TableCell>{shop.shopName}</TableCell>
              <TableCell>{shop.shopLicense}</TableCell>
              <TableCell>{shop.ownerName}</TableCell>
              <TableCell>{shop.shopEmail}</TableCell>
              <TableCell>{shop.licenseNumber}</TableCell>
              <TableCell>{shop.location}</TableCell>
              <TableCell>{shop.address}</TableCell>
              <TableCell>{shop.spiceCapacity}</TableCell>
              <TableCell>
                {shop.approved ? 'Approved' : 'Pending Approval'}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleApproval(shop._id, shop.approved)}
                  variant="contained"
                  color={shop.approved ? 'secondary' : 'primary'}
                >
                  {shop.approved ? 'Disapprove' : 'Approve'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShopTable;
