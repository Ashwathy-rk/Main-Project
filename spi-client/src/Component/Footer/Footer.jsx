import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="container bg-dark">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; 2023 Your Company. All rights reserved.</p>
          </div>
          <div className="col-md-6">
            <p>Contact: <a href="mailto:info@example.com">info@example.com</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
