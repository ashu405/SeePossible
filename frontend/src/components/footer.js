import React, { useState, useEffect } from "react";

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <footer className="axil-footer-area footer-style-2">
      <div className="footer-top separator-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="axil-footer-widget">
                <h5 className="widget-title">Address</h5>
                <div className="inner">
                  <p>
                    705 SNS Platina, <br />
                    behind J H Ambani School, Vesu, Surat, <br />
                    Gujarat 395007.
                  </p>
                  <ul className="support-list-item">
                    <li>
                      <a href="mailto:example@domain.com">
                        <i className="fal fa-envelope-open" />{" "}
                        ashuputhran8@gmail.com
                      </a>
                    </li>
                    <li>
                      <a href="tel:(+01)850-315-5862">
                        <i className="fal fa-phone-alt" /> (+91) 95860-82338
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="axil-footer-widget">
                <h5 className="widget-title">Account</h5>
                <div className="inner">
                  <ul>
                    {isLoggedIn ? (
                      <li>
                        <a href="#">My Account</a>
                      </li>
                    ) : (
                      ""
                    )}
                    <li>
                      <a href="#">Login</a>
                    </li>
                    <li>
                      <a href="#">Register</a>
                    </li>
                    {isLoggedIn ? (
                      <>
                        <li>
                          <a href="#">Cart</a>
                        </li>
                        <li>
                          <a href="#">Products</a>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="axil-footer-widget">
                <h5 className="widget-title">Quick Link</h5>
                <div className="inner">
                  <ul>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Terms Of Use</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area copyright-default separator-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-12">
              <div
                className="social-share"
                style={{ justifyContent: "center" }}
              >
                <a href="https://www.facebook.com/" target="_blank">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="https://www.instagram.com/" target="_blank">
                  <i className="fab fa-instagram" />
                </a>
                <a href="https://x.com/" target="_blank">
                  <i className="fab fa-twitter" />
                </a>
                <a href="https://www.linkedin.com/" target="_blank">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
