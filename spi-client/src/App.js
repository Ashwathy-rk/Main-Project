// app.js
import "bootstrap/dist/css/bootstrap.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import RegisterPage from "./Pages/Register/RegisterPage";
import RegisterPage1 from "./Pages/Register/RegisterPage1";
import RegisterPage2 from "./Pages/Register/RegisterPage2";
import RegisterPage3 from "./Pages/Register/RegisterPage3";
import LoginPage from "./Pages/LoginPage";
import AdminHome from "./Component/Dashboard/AdminHome";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme"
import { UserProvider } from "./Component/UseContext";
import Modal from 'react-modal';
Modal.setAppElement('#root');
import AddProductPage from "./Pages/AddProductPage";
import ProductViewPage from "./Pages/ProductViewPage";
import MoredetailsPage from "./Pages/MoredetailsPage";
import OrderPage from "./Pages/OrderPage";
import OrderConfirmation from "./Component/Order/Orderconfirmation";
import CustomerPage from "./Pages/Users/CustomerPage";
import AddtocartPage from "./Pages/AddtocartPage";
import LandownerPage from "./Pages/Users/LandownerPage";
import ParcherPage from "./Pages/Users/ParcherPage";
import ShopRegistrationPage from "./Pages/Shop/ShopRegistrationPage";
import ShopTable from "./Component/Tables/ShopTable";
import DealerTable from "./Component/Tables/DealerTable";
import UsersTable from "./Component/Tables/UserTable";
import ShopViewPage from "./Pages/Shop/ShopViewPage";
import DailyslotPage from "./Pages/SlotPage/DailyslotPage";
import BookslotPage from "./Pages/SlotPage/BookslotPage";
import ForgotPassword from "./Component/ForegetPassword";
import OtpVerification from "./Component/otpVerification";
import ContactusPage from "./Pages/ContactusPage";
import AboutPage from "./Pages/AboutPage";
import DealerPage from "./Pages/Users/DealerPage";
import BookingTablePage from "./Component/Tables/BookingTable";
import DealerRegPage from "./Pages/Dealer/DealerRegPage";
import SpicesHome from "./Component/SpicesBoard/SpicesHome";
import DealerViewPage from "./Pages/Dealer/DealerViewPage";
import AuctionForm from "./Component/CardamomPrices/Auction";
import SpicesBoardPage from "./Pages/Users/SpicesBoardPage";
import LicenseRequestForm from "./Component/License/LicesneRequest";
import LicenseRequestDisplay from "./Component/License/IssueLicense";
import AuctionPage from "./Component/CardamomPrices/AuctionView";
import PriceForm from "./Component/CardamomPrices/DealerPrices";
import PriceView from "./Component/CardamomPrices/DealerPriceView";
import CardamomSalePage from "./Pages/CardamomSalePage";
import CardamomSaleView from "./Component/Cardamomsale/CardamomSaleView";
import ShopLocationMap from "./Component/Map";
import RazorpayPayment from "./Component/Payment/Razorpay";
import Chat from "./Component/Chat";
import Chat1 from "./Component/Chat1";
import OrderHistory from "./Component/Order/Orderhistory";
import OrderTablePage from "./Component/Tables/Ordertable";



function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div> 
        <Router>
        <ThemeProvider theme={theme}>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/Register1" element={<RegisterPage1 />} />
            <Route path="/Register2" element={<RegisterPage2 />} />
            <Route path="/Register3" element={<RegisterPage3 />} />
            <Route path="/admin" element={<AdminHome/>} />
            <Route path="/contactus" element={<ContactusPage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/products" element={<AddProductPage/>} />
            <Route path="/productview" element={<ProductViewPage/>} />
            <Route path="/moredetails/:productId" element={<MoredetailsPage />} />
            <Route path="/order" element={<OrderPage/>} />
            <Route path="/orderconfirmation/:productId" element={<OrderPage />}/>
            <Route path="/customer" element={<CustomerPage />}/>
            <Route path="/addtocart/:productId" element={<AddtocartPage />}/>
            <Route path="/landowner" element={<LandownerPage />}/>
            <Route path="/parcher" element={<ParcherPage />}/>
            <Route path="/shopreg" element={<ShopRegistrationPage />}/>
            <Route path="/shopview" element={<ShopViewPage />} /> 
            <Route path="/users" element={<UsersTable />}/>
            <Route path="/shops" element={<ShopTable />}/>
            <Route path="/dealertable" element={<DealerTable />}/>
            <Route path="/dealer" element={<DealerPage />}/>
            <Route path="/dailyslot/:shopId" element={<DailyslotPage />}/>
            <Route path="/bookingdetails" element={<BookingTablePage />} />
            <Route path="/bookslot/:shopId/:date" element={<BookslotPage />} />
            <Route path="/dealerreg" element={<DealerRegPage />} />
            <Route path="/dealerview" element={<DealerViewPage />} />
            <Route path="/forgetpassword" element={<ForgotPassword />}/>
            <Route path="/otp" element={<OtpVerification />}/>
            <Route path="/spicesboard" element={<SpicesHome />}/>
            <Route path="/addauction" element={<AuctionForm />}/>
            <Route path="/auctionview" element={<AuctionPage />}/>
            <Route path="/spices" element={<SpicesBoardPage />}/>
            <Route path="/licenserequest" element={<LicenseRequestForm />}/>
            <Route path="/issuelicense" element={<LicenseRequestDisplay />}/>
            <Route path="/dealerpriceadd" element={<PriceForm />}/>
            <Route path="/dealerpriceview" element={<PriceView/>}/>
            <Route path="/saleform" element={<CardamomSalePage />}/>
            <Route path="/saleview" element={<CardamomSaleView />}/>
            <Route path="/shoplocation/:shopId" element={<ShopLocationMap />}/>
            <Route path="/payment" element={<RazorpayPayment />}/>
            <Route path="/orderhistory" element={<OrderHistory/>}/>
            <Route path="/orderdetails" element={<OrderTablePage/>}/>
            <Route path="/chat" element={<Chat />}/>
            <Route path="/chat1" element={<Chat1 />}/>
          </Routes>
          </UserProvider>
          </ThemeProvider>
        </Router>
  
    </div>
  );
}

export default App;
