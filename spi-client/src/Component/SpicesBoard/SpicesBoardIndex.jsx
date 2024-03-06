import React from 'react';
import './SpicesBoardIndex.css';
import { Link } from 'react-router-dom';

function SpiceBoardIndex() {
  return (
    <div>
      <header id="home" className="header">
        <div className="overlay text-white text-center">
          <h1 className="display-2 font-weight-bold my-3">Food Hut</h1>
          <h2 className="display-4 mb-5">Always fresh &amp; Delightful</h2>
          <div>
            <Link to="/licenserequest" className="btn btn-lg btn-primary mx-2">
              Apply for License
            </Link>
            <Link to="/auctionview" className="btn btn-lg btn-primary mx-2">
              View Auction Details
            </Link>
            {/* <button className="btn btn-lg btn-success mx-2" onClick={handleShowAuctionPrices}>
              Show Auction Prices
            </button> */}
          </div>
        </div>
      </header>
    </div>
  );
}

export default SpiceBoardIndex;