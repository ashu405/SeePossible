import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/header";
import LoginPage from "./components/login";
import RegistrationPage from "./components/register";
import Home from "./components/home";
import FooterComponent from "./components/footer"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsPage from "./components/products";
import CartPage from "./components/cart";
import ProductDetailPage from "./components/productdetail"
import UserProfilePage from "./components/userprofile";


function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Router>
        <HeaderComponent />
        <Routes>
          {/* Assuming you have a Home component */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          {/* Add other routes as needed */}
        </Routes>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
