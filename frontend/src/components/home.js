import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <main className="main-wrapper">
      <div className="axil-main-slider-area main-slider-style-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-sm-6">
              <div className="main-slider-content">
                <Slider {...settings}>
                  <div>
                    <span className="subtitle">
                      <i className="fas fa-fire" /> Hot Deal In This Week
                    </span>
                    <h1 className="title">Roco Wireless Headphone</h1>
                    <div className="slide-action">
                      <div className="shop-btn">
                        <Link to="#" className="axil-btn btn-bg-white">
                          <i className="fal fa-shopping-cart" />
                          Shop Now
                        </Link>
                      </div>
                      <div className="item-rating">
                        <div className="thumb">
                          <ul>
                            <li>
                              <img
                                src="/etrade/assets//images/others/author1.png"
                                alt="Author"
                              />
                            </li>
                            <li>
                              <img
                                src="/etrade/assets//images/others/author2.png"
                                alt="Author"
                              />
                            </li>
                            <li>
                              <img
                                src="/etrade/assets//images/others/author3.png"
                                alt="Author"
                              />
                            </li>
                            <li>
                              <img
                                src="/etrade/assets//images/others/author4.png"
                                alt="Author"
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="content">
                          <span className="rating-icon">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fal fa-star" />
                          </span>
                          <span className="review-text">
                            <span>100+</span> Reviews
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="subtitle">
                      <i className="fas fa-fire" /> Hot Deal In This Week
                    </span>
                    <h1 className="title">Smart Digital Watch</h1>
                    <div className="slide-action">
                      <div className="shop-btn">
                        <Link to="#" className="axil-btn btn-bg-white">
                          <i className="fal fa-shopping-cart" />
                          Shop Now
                        </Link>
                      </div>
                      <div className="item-rating">
                        <div className="thumb">
                          <ul>
                            <li>
                              <img
                                src="/etrade/assets//images/others/author1.png"
                                alt="Author"
                              />
                            </li>
                            <li>
                              <img
                                src="/etrade/assets//images/others/author2.png"
                                alt="Author"
                              />
                            </li>
                            <li>
                              <img
                                src="/etrade/assets//images/others/author3.png"
                                alt="Author"
                              />
                            </li>
                            <li>
                              <img
                                src="/etrade/assets//images/others/author4.png"
                                alt="Author"
                              />
                            </li>
                          </ul>
                        </div>
                        <div className="content">
                          <span className="rating-icon">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fal fa-star" />
                          </span>
                          <span className="review-text">
                            <span>100+</span> Reviews
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
            <div className="col-lg-7 col-sm-6">
              <div className="main-slider-large-thumb">
                <Slider {...settings}>
                  <div>
                    <img
                      src="/etrade/assets//images/product/product-38.png"
                      alt="Product"
                    />
                    <div className="product-price">
                      <span className="text">From</span>
                      <span className="price-amount">$49.00</span>
                    </div>
                  </div>
                  <div>
                    <img
                      src="/etrade/assets//images/product/product-39.png"
                      alt="Product"
                    />
                    <div className="product-price">
                      <span className="text">From</span>
                      <span className="price-amount">$49.00</span>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <ul className="shape-group">
          <li className="shape-1">
            <img src="/etrade/assets//images/others/shape-1.png" alt="Shape" />
          </li>
          <li className="shape-2">
            <img src="/etrade/assets//images/others/shape-2.png" alt="Shape" />
          </li>
        </ul>
      </div>
    </main>
  );
};
export default Home;
