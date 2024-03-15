import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ShopView.css'; // Import custom CSS for ShopView

const ShopView = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/shopview/shopview');
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="shopview-container">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Featured Shops</span>
      </h2>
      <div className="row px-xl-5">
        {shops.map((shop, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={shop._id}>
            <div className="card mb-4">
              <div className="card-body">
                
                <div className="shop-details mt-3">
                  <h5 className="card-title">{shop.shopName}</h5>
                  <p className="card-text">Email: {shop.shopEmail}</p>
                  <p className="card-text">Owner: {shop.ownerName}</p>
                  <p className="card-text">License Number: {shop.licenseNumber}</p>
                  <p className="card-text">Location: {shop.location}</p>
                  <p className="card-text">Address: {shop.address}</p>
                  <p className="card-text">Spice Capacity: {shop.spiceCapacity}</p>
                  <p className="card-text">Parching Price: {shop.parchingPrice}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <Link to={`/shoplocation/${shop._id}`} className="btn btn-primary">View Location</Link>
                    <Link to={`/chat`} className="btn btn-info btn-circle">Chat</Link>
                    <Link to={`/dailyslot/${shop._id}`} className="btn btn-success btn-square">Book Slot</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopView;
