import React from 'react'

function CustomNavbar() {
  return (
    <div>
        <div className="container-fluid bg-dark mb-30">
    <div className="col-lg-9">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
        <a href className="text-decoration-none d-block d-lg-none">
          <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
          <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
        </a>
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
          <div className="navbar-nav mr-auto py-0">
            <a href="/" className="nav-item nav-link active">Home</a>
            <a href="productview" className="nav-item nav-link">View Products</a>
            <a href="addtocart" className="nav-item nav-link">Your Cart</a>
          
            <a href="contact.html" className="nav-item nav-link">Contact</a>
          </div>
          <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
            <a href className="btn px-0">
              <i className="fas fa-heart text-primary" />
              <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom: 2}}>0</span>
            </a>
            <a href className="btn px-0 ml-3">
              <i className="fas fa-shopping-cart text-primary" />
              <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom: 2}}>0</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>


    </div>
  )
}

export default CustomNavbar
