// AuctionPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AuctionPage = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getauctions/getauctions');
        setAuctions(response.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Auction Details</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Auctioneer</TableCell>
              <TableCell>No. of Lots</TableCell>
              <TableCell>Total Qty Arrived (Kgs)</TableCell>
              <TableCell>Qty Sold (Kgs)</TableCell>
              <TableCell>Max Price (Rs./Kg)</TableCell>
              <TableCell>Avg. Price (Rs./Kg)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auctions.map((auction) => (
              <TableRow key={auction._id}>
                <TableCell>{new Date(auction.date).toLocaleDateString()}</TableCell>
                <TableCell>{auction.auctioneer}</TableCell>
                <TableCell>{auction.numberOfLots}</TableCell>
                <TableCell>{auction.totalQtyArrived}</TableCell>
                <TableCell>{auction.qtySold}</TableCell>
                <TableCell>{auction.maxPrice}</TableCell>
                <TableCell>{auction.avgPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AuctionPage;
