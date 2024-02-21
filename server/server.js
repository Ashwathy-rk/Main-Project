const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 5000;

const Users = require('./models/UserModel')

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
const auction = require("./controllers/auction")
const license = require("./controllers/license")
const dealerprice = require("./controllers/dealerprice")
const cardamomsale = require("./controllers/cardamomsale")



app.use(cors());
app.use(express.json());

app.use("/api/productview",productview)
app.use("/api/products",product)
app.use("/api/moredetails",moredetails)
app.use("/api/order",order)
app.use("/get-product-image/:filename",productview)
app.use("/api/add-to-cart",addtocart)
app.use("/api/cart",addtocart)
app.use("/api/remove",addtocart)
app.use("/api/shop",table)
app.use("/api/shopreg",shopreg)
app.use("/api/ordertable",table)
app.use("/api/users",table)
app.use("/api/user",table)
app.use("/api/dealertable",table)
app.use("/api/bookingdetails",table)
app.use("/api/shopview",shopreg)
app.use("/api/approve",shopreg)
app.use("/api/shopviewbyid",shopreg)
app.use("/api/dailyslot",dailyslot)
app.use("/api/getdailyslot",dailyslot)
app.use("/api/checkdailyslot",dailyslot)
app.use("/api/bookslot",bookslot)
app.use("/api/bookingsold",bookslot) 
app.use("/api/dealerreg",dealerreg)
app.use("/api/dealerview",dealerreg)
app.use("/api/approvedealer",dealerreg)
app.use("/api/addauction",auction)
app.use("/api/getauctions",auction)
app.use("/api/licenserequest",license)
app.use("/api/getlicense",license)
app.use("/api/generatelicense",license)
app.use("/api/addprice",dealerprice)
app.use("/api/getprice",dealerprice)
app.use("/api/cardamomsale",cardamomsale)
app.use("/api/cardamomsaleview",cardamomsale)

mongoose.connect('mongodb://localhost:27017/Project')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
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
