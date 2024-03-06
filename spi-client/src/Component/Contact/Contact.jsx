import React from 'react'
import './Contact.css'


function Contact() {
  return (
    <div>
      <div>
  <section className="contact_section layout_padding">
    <div className="container">
      <div className="col-md-6">
        <div className="d-flex mb-4 ml-4 ml-md-0">
          <h2 className="custom_heading text-center">
            CONTACT US
          </h2>
        </div>
        <form action>
          <div>
            <input type="text" placeholder="Name" />
          </div>
          <div>
            <input type="email" placeholder="Email" />
          </div>
          <div>
            <input type="text" placeholder="Pone Number" />
          </div>
          <div>
            <input type="text" className="message-box" placeholder="Message" />
          </div>
          <div className="d-flex justify-content-center mt-4 ">
            <button>
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
 
  <section className="info_section layout_padding">
    <div className="container layout_padding-top  layout_padding2-bottom">
      <div className="logo-box">
        <a href="index.html">
          <img src="images/info-logo.png" alt />
        </a>
      </div>
      <div className="info_items">
        <a href>
          <div className="item ">
            <div className="img-box box-1">
              <img src="images/location-white.png" alt />
            </div>
            <div className="detail-box">
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem
              </p>
            </div>
          </div>
        </a>
        <a href>
          <div className="item ">
            <div className="img-box box-3">
              <img src="images/envelope-white.png" alt />
            </div>
            <div className="detail-box">
              <p>
                demo@gmail.com
              </p>
            </div>
          </div>
        </a>
        <a href>
          <div className="item ">
            <div className="img-box box-2">
              <img src="images/telephone-white.png" alt />
            </div>
            <div className="detail-box">
              <p>
                +02 1234567890
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
  {/* end info_section */}
  {/* footer section */}
  <section className="container-fluid footer_section">
    <p>
      © 2019 All Rights Reserved By
      <a href="https://html.design/">Free Html Templates</a>
    </p>
  </section>
  {/* footer section */}
</div>

    </div>
  )
}

export default Contact
