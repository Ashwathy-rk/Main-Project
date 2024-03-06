// ProductView.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductView = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/productview/productview');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid pt-5 pb-3">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Featured Products</span>
      </h2>
      <div className="row px-xl-5">
        {products.map((product, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={product._id}>
            <div className="product-item bg-light mb-4">
              <div className="product-img position-relative overflow-hidden">
                <Link to={`/moredetails/${product._id}`}>
                  <img
                    className="img-fluid w-100"
                    src={`http://localhost:5000/get-product-image/get-product-image/get-product-image/${product.productImage}`}
                    alt={product.productName}
                  />
                </Link>
                <div className="product-action">
                  <Link to="#" className="btn btn-outline-dark btn-square"><i className="fa fa-shopping-cart"></i></Link>
                  <Link to="#" className="btn btn-outline-dark btn-square"><i className="far fa-heart"></i></Link>
                  <Link to="#" className="btn btn-outline-dark btn-square"><i className="fa fa-sync-alt"></i></Link>
                  <Link to="#" className="btn btn-outline-dark btn-square"><i className="fa fa-search"></i></Link>
                </div>
              </div>
              <div className="text-center py-4">
                <Link to={`/moredetails/${product._id}`} className="h6 text-decoration-none text-truncate">{product.productName}</Link>
                <div className="d-flex align-items-center justify-content-center mt-2">
                  <h5>{product.price}</h5>
                </div>
                {/* <div className="d-flex align-items-center justify-content-center mb-1">
                  {[1, 2, 3, 4, 5].map((star, i) => (
                    <small key={i} className={`fa fa-star${i < product.rating ? ' text-primary' : ' far'}`}></small>
                  ))}
                  <small>({product.reviews})</small>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductView;


