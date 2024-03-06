import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardamomSaleView = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Fetch cardamom sales from the server
    const fetchCardamomSales = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cardamomsaleview/cardamomsaleview');
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching cardamom sales:', error);
      }
    };

    fetchCardamomSales();
  }, []);

  // Calculate total quantity for each day
  const calculateTotalQuantity = () => {
    const totalQuantityByDay = {};

    sales.forEach((sale) => {
      const saleDate = sale.date.split('T')[0]; // Extract date part
      if (totalQuantityByDay[saleDate]) {
        totalQuantityByDay[saleDate] += parseFloat(sale.amountInKg);
      } else {
        totalQuantityByDay[saleDate] = parseFloat(sale.amountInKg);
      }
    });

    return totalQuantityByDay;
  };

  const totalQuantityByDay = calculateTotalQuantity();

  return (
    <div>
      <h2>Cardamom Sales</h2>
      {sales.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount in Kg</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale._id}>
                  <td>{sale.date.split('T')[0]}</td>
                  <td>{sale.amountInKg}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Total Quantity by Day</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(totalQuantityByDay).map(([date, totalQuantity]) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{totalQuantity.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No cardamom sales available.</p>
      )}
    </div>
  );
};

export default CardamomSaleView;
