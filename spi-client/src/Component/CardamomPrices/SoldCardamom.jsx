import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCardamomSales = () => {
  const [sales, setSales] = useState([]);
  const userId = localStorage.getItem('userId').replace(/"/g, '');
  console.log(userId)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/selling/user-sales/${userId}`);
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching cardamom sales:', error);
      }
    };
    fetchSales();
  }, [userId]);

  // Filter sales to only include today's sales
  const today = new Date().toLocaleDateString();
  const todaySales = sales.filter(sale => new Date(sale.timestamp).toLocaleDateString() === today);

  return (
    <div className="user-cardamom-sales">
      <h2>Your Sold Cardamom</h2>
      {todaySales.length === 0 ? (
        <p>No cardamom sold today.</p>
      ) : (
        <ul>
          {todaySales.map((sale) => (
            <li key={sale._id}>
              <p>Spice Center Name: {sale.spiceCenterName}</p>
              <p>Landowner's Name: {sale.landownersName}</p>
              <p>Phone Number: {sale.phoneNumber}</p>
              <p>Quantity: {sale.quantity} kg</p>
              <p>Date: {new Date(sale.timestamp).toLocaleDateString()}</p>
              {/* You can add more details if needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserCardamomSales;
