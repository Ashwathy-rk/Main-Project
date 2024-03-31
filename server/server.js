const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 5000;
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const Users = require('./models/UserModel')
const Payment = require('./models/PaymentModel')

const product = require("./controllers/product")
const productview = require("./controllers/productview")
const moredetails = require("./controllers/moredetails")
const order = require("./controllers/order")
const addtocart = require("./controllers/addtocart")
const shopreg = require("./controllers/shopreg")
const table = require("./controllers/table")
const dailyslot = require("./controllers/dailyslot")
const bookslot = require("./controllers/bookslot")
const dealerreg = require("./controllers/dealerreg")

const license = require("./controllers/license")

const delivery = require("./controllers/delivery")




app.use(cors());
app.use(express.json());

app.use("/api/productview",productview)
app.use("/api/products",product)
app.use("/api/moredetails",moredetails)
app.use("/api/order",order)
app.use("/api/orders",order)
app.use("/api/ordering",order)
app.use("/api/productstock",order)
app.use("/get-product-image/:filename",productview)
app.use("/api/add-to-cart",addtocart)
app.use("/api/clear-cart",addtocart)
app.use("/api/cart",addtocart)
app.use("/api/remove",addtocart)
app.use("/api/shop",table)
app.use("/api/shopreg",shopreg)
app.use("/api/ordertable",table)
app.use("/api/users",table)
app.use("/api/user",table)
app.use("/api/dealertable",table)
app.use("/api/ordertable",table)
app.use("/api/bookingdetails",table)
app.use("/api/shopview",shopreg)
app.use("/api/approve",shopreg)
app.use("/api/shopviewbyid",shopreg)
// app.use("/api/create-order",payment)
// app.use("/api/verify-payment",payment)
app.use("/api/shoplocation",shopreg)
app.use("/api/dailyslot",dailyslot)
app.use("/api/getdailyslot",dailyslot)
app.use("/api/bookslot",bookslot)
app.use("/api/bookingsold",bookslot) 
app.use("/api/dealerreg",dealerreg)
app.use("/api/dealerview",dealerreg)
app.use("/api/approvedealer",dealerreg)

app.use("/api/licenserequest",license)
app.use("/api/getlicense",license)
app.use("/api/generatelicense",license)

app.use("/api/delivery",delivery)


mongoose.connect('mongodb://localhost:27017/Project')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



  app.use(bodyParser.json());

  const razorpay = new Razorpay({
    key_id: 'rzp_test_QCVPmuBwOiEzBI',      // Replace with your Razorpay Key ID
    key_secret: 'JFZYLJBq9hPDYf3TRVBDKaA1',  // Replace with your Razorpay Key Secret
  });
  
  // Your existing server logic...
  
  // Razorpay integration for creating an order
  let orderIdCounter = 1; // Initialize a simple order ID counter

  app.post('/api/create-order', async (req, res) => {
    console.log('Received create order request:', req.body);
    const { amount, currency } = req.body;
    console.log(amount);  
    try {
      const orderOptions = {
        amount: amount * 100,
        currency,
        receipt: `order_${orderIdCounter}`,
      };
  
      const order = await razorpay.orders.create(orderOptions);
      orderIdCounter += 1;
  
      res.json({ order_Id: order.id });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });
  


  app.post('/api/save-payment', async (req, res) => {
    try {
      // Extract payment details from the request body
      const { userId, orderId, amount, currency, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
  
      // Create a new payment document
      const payment = new Payment({
        user: userId, // Assuming 'user' is a reference to the User model
        amount: amount,
        currency: currency,

        status: 'success', // Assuming the payment was successful
      });
  
      // Save the payment to the database
      await payment.save();
  
      // Send a success response
      res.status(201).json({ message: 'Payment details saved successfully', payment: payment });
    } catch (error) {
      console.error('Error saving payment:', error);
      // Send an error response
      res.status(500).json({ message: 'Failed to save payment details', error: error.message });
    }
  });
  
   


// Registration for Customer
app.post('/register', async (req, res) => {
  const { name, username, email, password, confirmPassword, address } = req.body;
  console.log(name, username, email, password, confirmPassword, address);

  try {
    const newUser = new Users({ name, username, email, password, confirmPassword, address, role: 'customer' });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ msg: 'Customer registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to register customer' });
  }
});

// Registration for Dealer
app.post('/register1', async (req, res) => {
  const { name, username, email, password, confirmPassword, address } = req.body;
  console.log(name, username, email, password, confirmPassword, address);

  try {
    const newUser = new Users({ name, username, email, password, confirmPassword, address, role: 'dealer' });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ msg: 'Dealer registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to register dealer' });
  }
});

// Registration for Landowner
app.post('/register2', async (req, res) => {
  const { name, username, email, password, confirmPassword, address } = req.body;
  console.log(name, username, email, password, confirmPassword, address);

  try {
    const newUser = new Users({ name, username, email, password, confirmPassword, address, role: 'landowner' });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ msg: 'Landowner registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to register landowner' });
  }
});


app.post('/register3', async (req, res) => {
  const { name, username, email, password, confirmPassword, address } = req.body;
  console.log(name, username, email, password, confirmPassword, address);

  try {
    const newUser = new Users({ name, username, email, password, confirmPassword, address, role: 'parcher' });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ msg: 'Parcher registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Failed to register landowner' });
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user with provided credentials exists
    const user = await Users.findOne({ username });
    if (user) {
      res.status(200).json({ msg: 'Login Successful' ,user : { user} });
    } else {
      res.status(401).json({ msg: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred during login' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



////
const nodemailer = require('nodemailer');

const emailUser ="ashwathyrk08@gmail.com";
const emailPassword ="sjnq xrwa abho qsej";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

let storedOtps = {}; // Store OTPs for different users

app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log(email)
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store the OTP in the user's record (in a production app, you'd use a database)
  try {
    const user = await Users.findOne({ email });
    
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found!!!",
      });
    }

    // Store the OTP for this user
    storedOtps[email] = otp;

    // Send the OTP via email
    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP for password reset: ${otp},`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("OTP email sent:", info.response);
      res.status(200).json({ 
        success: true,
        message: "OTP sent successfully." });
    });
  } catch (error) {
    console.error("Error saving OTP:", error);
    return res.status(500).json({ 
      error: "Internal Server Error" });
  }
});

// Verify OTP and reset password
app.post('/api/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  console.log(email, otp, newPassword);
  
  try {
    const user = await Users.findOne({ email });
    
    console.log(user);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found!!!",
      });
    }

    // Check if the provided OTP matches the stored OTP for this user
    if (storedOtps[email] !== otp) {
      console.log(otp);
      console.log(storedOtps[email]);
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Update the user's password and clear the OTP
    const login = await Users.findOne({ email });
    console.log(newPassword);
    const saltRounds = 10;
    const password = newPassword;
    console.log(password);
    delete storedOtps[email]; // Clear the OTP for this user
    await login.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


// const axios = require('axios');

// app.get('/cardamom-price', async (req, res) => {
//   try {
//     const response = await axios.get('https://www.indianspices.com/marketing/price/domestic/daily-price.html');
//     const html = response.data;

//     // Parse HTML string into a DOM document
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');

//     // Find the cardamom price element
//     const cardamomPriceElement = doc.getElementById('domesticDailyPrice')
//       .getElementsByClassName('price-list-content')[0]
//       .getElementsByTagName('tr')[1] // Assuming cardamom price is the second row
//       .getElementsByTagName('td')[2]; // Assuming price is in the third column

//     // Extract the price text
//     const cardamomPrice = cardamomPriceElement.textContent.trim();

//     res.json({ price: cardamomPrice });
//   } catch (error) {
//     console.error('Error fetching cardamom price:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// const { createProxyMiddleware } = require('http-proxy-middleware');

// // Set up proxy middleware
// app.use('/priceadd', createProxyMiddleware({
//   target: 'https://www.indianspices.com',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/priceadd': '/marketing/price/domestic/daily-price.html', // Adjust path as needed
//   },
// }));

// app.listen(3001, () => {
//   console.log('Proxy server running on port 3001');
// });


// const axios = require('axios');
// // Fetch data from external website
// axios.get('https://www.indianspices.com/marketing/price/domestic/daily-price.html')
//   .then(response => {
//       const $ = cheerio.load(response.data);
//       // Parse the HTML and extract relevant data
//       const prices = []; // This should contain the extracted data
//       // Iterate over the data and save it to MongoDB
//       prices.forEach(price => {
//           Price.create(price);
//       });
//   })
//   .catch(error => {
//       console.log(error);
//   });

// // Expose an API endpoint to retrieve data
// app.get('/prices', async (req, res) => {
//   try {
//       const prices = await Price.find();
//       res.json(prices);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// });

const axios = require('axios');

const cheerio = require('cheerio'); // Import cheerio library


app.get('/prices', async (req, res) => {
  try {
      const response = await axios.get('https://www.indianspices.com/marketing/price/domestic/daily-price.html');
      const html = response.data;
      
      // Load the HTML into cheerio
      const $ = cheerio.load(html);

      // Extract cardamom prices
      const cardamomPrices = [];
      $('table tr').each((index, element) => {
          const columns = $(element).find('td');
          if (columns.length === 8) { // Fix the condition to check for 8 cells
              const price = {
                  date: $(columns[1]).text(),
                  auctioneer: $(columns[2]).text(),
                  lots: parseInt($(columns[3]).text()),
                  totalQty: parseFloat($(columns[4]).text()),
                  qtySold: parseFloat($(columns[5]).text()),
                  maxPrice: parseFloat($(columns[6]).text()),
                  avgPrice: parseFloat($(columns[7]).text())
              };
              cardamomPrices.push(price);
          }
      });

      console.log("Backend cardamom prices:", cardamomPrices); // Log the cardamom prices
      res.json(cardamomPrices);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
  }
});
