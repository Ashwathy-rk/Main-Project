import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

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
    const createDefaultSlots = async () => {
      try {
        if (shop) {
          // Check if daily slots already exist for the current week
          const response = await axios.get(`http://localhost:5000/api/getdailyslot/getdailyslot/${shopId}`);
          const existingSlots = response.data;
  
          if (existingSlots.length === 0) {
            const currentDate = new Date();
            const defaultSlots = [];
  
            for (let i = 0; i < 7; i++) {
              const date = new Date(currentDate);
              date.setDate(currentDate.getDate() + i);
  
              const startTime = '09:00 AM';
              const endTime = '05:00 PM';
  
              const slot = {
                date: date.toISOString(),
                slots: [
                  {
                    startTime,
                    endTime,
                  },
                ],
             
              };
  
              defaultSlots.push(slot);
            }
  
            setDailySlots(defaultSlots);
  
            // Save the daily slots to the database
            await axios.post(`http://localhost:5000/api/dailyslot/dailyslot/${shopId}`, { slots: defaultSlots });
          } else {
            setDailySlots(existingSlots);
          }
        }
      } catch (error) {
        console.error('Error creating or fetching default slots:', error);
      }
    };
  
    createDefaultSlots();
  }, [shop, shopId]);
  
 

  const handleBooking = (date, bookingAmount, bookingAmountUnit) => {
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

      // Navigate to booking page after updating capacity
      navigateToBookingPage(date);
    } catch (error) {
      console.error('Error updating state and submitting booking:', error);
    }
  };

  const navigateToBookingPage = (date) => {
    // Replace this with your actual navigation logic
    window.location.href = `/bookslot/${shopId}/${date}`;
  };

  return (
    <div className="container-fluid pt-5 pb-3">
      <h2 className="text-center mb-4">Daily Slots</h2>

      {Array.isArray(dailySlots) && dailySlots.length > 0 ? (
        dailySlots.map((dailySlot) => (
          <div key={dailySlot.date} className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Date: {new Date(dailySlot.date).toLocaleDateString()}</h3>
              <p>Total Capacity: {dailySlot.availableSpiceCapacity}</p>
              <ul className="list-unstyled">
                {dailySlot.slots.map((slot, index) => (
                  <li key={`${dailySlot.date}-${index}`} className="mb-2">
                    <Link
                      to={`/bookslot/${shopId}/${dailySlot.date}`}
                      onClick={() => handleBooking(dailySlot.date, 1, 'kg')}
                      className="btn btn-primary"
                    >
                      {slot.startTime} - {slot.endTime}, Available Spice Capacity: {slot.availableSpiceCapacity}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-warning">No daily slots available.</div>
      )}
    </div>
  );
};

export default DailySlot;
