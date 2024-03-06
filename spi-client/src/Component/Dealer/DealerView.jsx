import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Make sure to import Link
import './DealerView.css';

const DealerView = () => {
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    const fetchDealerData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dealerview/dealerview');
        console.log('Response from server:', response.data);
        setDealers(response.data);
      } catch (error) {
        console.error('Error fetching dealer data:', error);
      }
    };

    fetchDealerData();
  }, []);

  return (
    <div className="dealer-container">
      {dealers.length > 0 ? (
        <div>
          {dealers.map((dealer) => (
            <div key={dealer._id} className="dealer-card">
              <h2>{dealer.dealerName}</h2>
              <div className="dealer-details">
                <p>Email: {dealer.dealerEmail}</p>
                <p>Location: {dealer.dealerLocation}</p>
              </div>
             
              <Link to={`/saleform`} className="btn btn-primary">
                Sell Cardamom
              </Link>

              <Link to={`/dealerpriceview`} className="btn btn-primary">
                View Cardamom Price
              </Link>

              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div>No dealers available.</div>
      )}
    </div>
  );
};

export default DealerView;