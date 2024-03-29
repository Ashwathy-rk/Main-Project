// Index.jsx
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Index.css';

function Index() {
  return (
    <div>
      <div className="hero_area">
        {/* header section starts */}
        <header className="header_section">
          <div className="container-fluid">
            <Navbar expand="lg" className="custom_nav-container pt-3">
              <Navbar.Brand href="index.html">
                <span>AROMAWAGON</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarSupportedContent" />
              <Navbar.Collapse id="navbarSupportedContent">
                <Nav className="ml-auto flex-column flex-lg-row align-items-center">
                  <Nav.Link href="index.html">Home</Nav.Link>
                  <Nav.Link href="about.html">About</Nav.Link>
                  <Nav.Link as={Link} to="/contactus" className="btn btn-outline-light mr-3">
                    Contact Us
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login" className="btn btn-outline-light mr-3">
                    Login
                  </Nav.Link>
                  <NavDropdown title="Register" id="registrationDropdown">
                    <NavDropdown.Item as={Link} to="/register">
                      Customer
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/register2">
                      Landowner
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/register1">
                      Dealer
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/register3">
                      Parcher
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Index;
