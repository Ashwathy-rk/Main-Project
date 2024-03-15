import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Dailyslot.css';

const DailySlot = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [dailySlots, setDailySlots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopResponse = await axios.get(`http://localhost:5000/api/shopviewbyid/shopviewbyid/${shopId}`);
        console.log('Shop Response:', shopResponse.data);

        if (shopResponse.data && shopResponse.data.hasOwnProperty('spiceCapacity')) {
          const shopData = shopResponse.data;
          setShop(shopData);
        } else {
          console.error('Shop data is not available or has an incorrect format.');
        }
      } catch (error) {
        console.error('Error fetching shop data:', error);
      }
    };

    fetchData();
  }, [shopId]);

  useEffect(() => {
    const fetchDailySlots = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/getdailyslot/getdailyslot/${shopId}`);
        setDailySlots(response.data);
      } catch (error) {
        console.error('Error fetching daily slots:', error);
      }
    };

    fetchDailySlots();
  }, [shopId]);

  const fetchAvailableCapacity = async (date) => {
    try {
      const formattedDate = new Date(date).toISOString();
      console.log('Formatted Date:', formattedDate);// Convert date to ISO string format
      const response = await axios.get(`http://localhost:5000/api/availablecapacity/availablecapacity/${shopId}/${formattedDate}`);

      console.log(response.data.availableCapacity);
      return response.data.availableCapacity;
  
    } catch (error) {
      console.error('Error fetching available capacity:', error);
      return null;
    }
    
  };
  

  const handleBooking = async (date, bookingAmount, bookingAmountUnit) => {
    try {
      const spiceReduction = bookingAmountUnit === 'kg' ? bookingAmount : bookingAmount / 1000;

      // Update only availableSpiceCapacity for the booked date and slot
      const updatedDailySlots = dailySlots.map((dailySlot) => {
        if (dailySlot.date === date) {
          const updatedSlots = dailySlot.slots.map((slot) => ({
            ...slot,
            availableSpiceCapacity: slot.availableSpiceCapacity - spiceReduction,
          }));

          return {
            ...dailySlot,
            availableSpiceCapacity: dailySlot.availableSpiceCapacity - spiceReduction,
            slots: updatedSlots,
          };
        }
        return dailySlot;
      });

      setDailySlots(updatedDailySlots);

      // Fetch updated available capacity after booking
      const availableCapacity = await fetchAvailableCapacity(date);

      // Navigate to booking page after updating capacity
      navigateToBookingPage(date, availableCapacity);
    } catch (error) {
      console.error('Error updating state and submitting booking:', error);
    }
  };

  const navigateToBookingPage = (date, availableCapacity) => {
    // Replace this with your actual navigation logic
    window.location.href = `/bookslot/${shopId}/${date}`;
  };

  return (
    <div className="dailyslot-container ">
      <h2 className="text-center mb-4">Daily Slots</h2>

      {dailySlots.map((dailySlot) => (
        <div key={dailySlot.date} className="card mb-4">
          <div className="card-body">
            <h3 className="card-title">Date: {new Date(dailySlot.date).toLocaleDateString()}</h3>
            <ul className="list-unstyled">
              {dailySlot.slots.map((slot, index) => (
                <li key={`${dailySlot.date}-${index}`} className="mb-3">
                  <div className="slot-info">
                    <div>
                      <p className="mb-0">Time: {slot.startTime} - {slot.endTime}</p>
                      <p className="mb-0">Available Capacity: {dailySlot.availableSpiceCapacity}</p>
                    </div>
                    <button
                      onClick={() => handleBooking(dailySlot.date, 1, 'kg')}
                      className="btn btn-primary btn-sm" // Add btn-sm class for smaller button
                    >
                      Book Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {dailySlots.length === 0 && (
        <div className="alert alert-warning">No daily slots available.</div>
      )}
    </div>
  );
};

export default DailySlot;