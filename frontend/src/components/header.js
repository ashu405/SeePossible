import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="header axil-header header-style-1">
      <div id="axil-sticky-placeholder" />
      <div className="axil-mainmenu">
        <div className="container">
          <div className="header-navbar">
            <div className="header-brand">
                <Link className="logo logo-dark" to="/">
                  <p className="companylogo">seepossible</p>
                </Link>
              <a href="#" className="logo logo-light">
                <img src="assets/images/logo/logo-light.png" alt="Site Logo" />
              </a>
            </div>
            <div className="header-main-nav">
              <nav className="mainmenu-nav">
                <button className="mobile-close-btn mobile-nav-toggler">
                  <i className="fas fa-times" />
                </button>
                <div className="mobile-nav-brand">
                  <a href="#" className="logo">
                    <img src="assets/images/logo/logo.png" alt="Site Logo" />
                  </a>
                </div>
                <ul className="mainmenu">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  {isLoggedIn ? (
                    <li>
                      <Link to="/products">Products</Link>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </nav>
            </div>
            <div className="header-action">
              <ul className="action-list">
                {isLoggedIn ? (
                  <>
                    <li className="shopping-cart">
                      <Link to="/cart" className="cart-dropdown-btn">
                        <i className="flaticon-shopping-cart" />
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
                <li className="my-account">
                  {isLoggedIn ? (
                    <>
                      <Link to="/profile">
                        <i className="flaticon-person" />
                      </Link>
                    </>
                  ) : (
                    <Link to="/login">
                      <i className="flaticon-person" />
                    </Link>
                  )}
                  <div className="my-account-dropdown">
                    <span className="title">QUICKLINKS</span>
                    <ul>
                      <li>
                        <a href="#">My Account</a>
                      </li>
                      <li>
                        <a href="#">Initiate return</a>
                      </li>
                      <li>
                        <a href="#">Support</a>
                      </li>
                      <li>
                        <a href="#">Language</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
