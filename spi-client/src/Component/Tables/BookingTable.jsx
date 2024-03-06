// components/BookingTablePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const BookingTablePage = () => {
  const { shopId } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookingdetails/bookingdetails`);
        console.log('Booking Details:', response.data); // Log the data
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    


    fetchBookings();
  }, [shopId]);

  const handleCheckboxChange = async (bookingId) => {
    try {
      console.log('Checkbox clicked for bookingId:', bookingId);
      // Update the 'sold' property locally
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, sold: !booking.sold } : booking
        )
      );

      // Update the 'sold' property in the database
      await axios.patch(`http://localhost:5000/api/bookingsold/bookingsold/${bookingId}`, {
        sold: true, // Set to true, you can adjust this based on your logic
      });
    } catch (error) {
      console.error('Error updating sold status:', error);
    } 
  };

  return (
    <div className="container">
      <h2>Booking Table Page</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Booking Amount</TableCell>
              <TableCell>Booking Amount Unit</TableCell>
              <TableCell>Booking Date</TableCell>
              <TableCell>Booking Time</TableCell>
              <TableCell>Sold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{booking.address}</TableCell>
                <TableCell>{booking.phoneNumber}</TableCell>
                <TableCell>{booking.bookingAmount}</TableCell>
                <TableCell>{booking.bookingAmountUnit}</TableCell>
                <TableCell>{new Date(booking.bookingDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(booking.bookingTime).toLocaleTimeString()}</TableCell>
                <TableCell>
                <input
                    type="checkbox"
                    checked={booking.sold}
                    onChange={() => handleCheckboxChange(booking._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookingTablePage;
