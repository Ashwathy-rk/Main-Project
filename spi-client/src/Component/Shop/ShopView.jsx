import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './ShopView.css';

const ShopView = () => {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to fetch shop data
  const fetchShopData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/shopview/shopview');
      console.log('Response from server:', response.data);
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shop data:', error);
    }
  };

  useEffect(() => {
    fetchShopData();
  }, []);

  const handleLocationClick = (shopId) => {
    // Use navigate here
    navigate(`/shoplocation/${shopId}`);
  };

  return (
    <div className="container-fluid pt-5 pb-3">
      {shops.length > 0 ? (
        <div>
          {shops.map((shop) => (
            <div key={shop._id} className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">{shop.shopName}</h2>
                <p className="card-text">Email: {shop.shopEmail}</p>
                <p className="card-text">Owner: {shop.ownerName}</p>
                <p className="card-text">
                  License Number: {shop.licenseNumber}
                </p>
                <p className="card-text">Location: {shop.location}</p>
                <p className="card-text">Address: {shop.address}</p>
                <p className="card-text">
                  Spice Capacity: {shop.spiceCapacity}
                </p>
                <p className="card-text">Parching Price: {shop.parchingPrice}</p>


                <Link
                  to={`/dailyslot/${shop._id}`}
                  className="btn btn-primary mr-2"
                >
                  Book Slot
                </Link>

                <Link to={`/shoplocation/${shop._id}`} className="btn btn-info">
                  Location
                </Link>
                <Link to={`/chat`} className="btn btn-info">
                  Chat
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ShopView;
