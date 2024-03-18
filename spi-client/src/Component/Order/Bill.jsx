import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Invoice = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const orderId = localStorage.getItem('orderId');
  
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await axios.get(`http://localhost:5000/api/current/${orderId}`);
        const fetchedOrderDetails = orderResponse.data;
        setOrderDetails(fetchedOrderDetails);
  
        // Retrieve user details from local storage
        const storedUserDetails = JSON.parse(localStorage.getItem('user'));
        setUserDetails(storedUserDetails);
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
  
    fetchOrderDetails();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <meta charSet="utf-8" />
      <title>Invoice</title>
      <link rel="stylesheet" href="style.css" media="all" />
      <header className="clearfix">
        <div id="logo">
          <img src="logo.png" />
        </div>
        <div id="company">
          <h2 className="name">Company Name</h2>
          <div>455 Foggy Heights, AZ 85004, US</div>
          <div>(602) 519-0450</div>
          <div><a href="mailto:company@example.com">company@example.com</a></div>
        </div>
      </header>
      <main>
        <div id="details" className="clearfix">
          <div id="client">
            <div className="to">INVOICE TO:</div>
            <div>User Name: {userDetails.name}</div>
            <div>User Address: {userDetails.address}</div>
            <div className="email"><a href={`mailto:${userDetails.email}`}>{userDetails.email}</a></div>
          </div>
          <div id="invoice">
            <h1>INVOICE {orderDetails.invoiceNumber}</h1>
            <div className="date">Date of Invoice: {orderDetails.date}</div>
            <div className="date">Due Date: {orderDetails.dueDate}</div>
          </div>
        </div>
        <table border={0} cellSpacing={0} cellPadding={0}>
          <thead>
            <tr>
              <th className="no">#</th>
              <th className="desc">DESCRIPTION</th>
              <th className="unit">UNIT PRICE</th>
              <th className="qty">QUANTITY</th>
              <th className="total">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.items.map((item, index) => (
              <tr key={index}>
                <td className="no">{index + 1}</td>
                <td className="desc">
                  <h3>{item.productName}</h3>
                  {item.description}
                </td>
                <td className="unit">${item.unitPrice}</td>
                <td className="qty">{item.quantity}</td>
                <td className="total">${item.total}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} />
              <td colSpan={2}>SUBTOTAL</td>
              <td>${orderDetails.subtotal}</td>
            </tr>
            <tr>
              <td colSpan={2} />
              <td colSpan={2}>TAX {orderDetails.taxRate * 100}%</td>
              <td>${orderDetails.tax}</td>
            </tr>
            <tr>
              <td colSpan={2} />
              <td colSpan={2}>GRAND TOTAL</td>
              <td>${orderDetails.grandTotal}</td>
            </tr>
          </tfoot>
        </table>
        <div id="thanks">Thank you!</div>
        <div id="notices">
          <div>NOTICE:</div>
          <div className="notice">{orderDetails.notice}</div>
        </div>
      </main>
      <footer>
        Invoice was created on a computer and is valid without the signature and seal.
      </footer>
    </div>
  );
};

export default Invoice;
