import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardamomSaleForm from '../Cardamomsale/Selling'; // Import the CardamomSaleForm component
import './DealerPrice.css'

const PriceList = () => {
  const [prices, setPrices] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch prices from the server
    const fetchPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getprice/getprice');
        setPrices(response.data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
  }, []);

  const handleSellCardamom = (priceId) => {
    // Add your logic to sell cardamom based on the priceId
    console.log(`Selling cardamom for price with ID: ${priceId}`);
    setShowModal(true); // Show the modal when selling cardamom
  };

  return (
    <div>
      <h2>Prices</h2>
      {prices.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Max Price</th>
              <th>Avg Price</th>
              <th>Dealer Name</th>
              <th>Dealer Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((price) => (
              <tr key={price._id}>
                <td>{price.date}</td>
                <td>{price.maxPrice}</td>
                <td>{price.avgPrice}</td>
                <td>{price.dealerName}</td>
                <td>{price.dealerLocation}</td>
                <td>
                  <button onClick={() => handleSellCardamom(price._id)}>Sell Cardamom</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No prices available.</p>
      )}

      {/* Modal for adding Cardamom Sale */}
      {showModal && <CardamomSaleForm closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default PriceList;
