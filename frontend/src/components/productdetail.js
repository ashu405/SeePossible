import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service";

const ProductDetail = () => {
    const { id } = useParams();
    const [productDetails, setproductdetails] = useState([]);
    const [token, setToken] = useState("");
    const [userID, setUserID] = useState("");

    useEffect(() => {
        
      const storedToken = localStorage.getItem("token");
      const storedUserID = localStorage.getItem("userID");
      if (storedToken) {
        setToken(storedToken);
        setUserID(storedUserID);
        fetchProductsDetails(id);
      }
    }, []);

    const fetchProductsDetails = (id) => {
        debugger
      service
        .getProductDetails(localStorage.getItem("token"), id)
        .then((response) => {
          if (response.data.status) {
            setproductdetails(response.data.data[0]);
          } else {
            console.error("Failed to fetch categories:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };
    const handleAddToCart = (productID) => {
      debugger;
      service
        .addToCart(token, userID, productID, 1)
        .then((response) => {
          if (response.data.status) {
            alert("Product added to cart successfully");
          } else {
            console.error(
              "Failed to add product to cart:",
              response.data.message
            );
          }
        })
        .catch((error) => {
          console.error("Error adding product to cart:", error);
        });
    };
  return (
    <main className="main-wrapper">
      <div className="axil-single-product-area bg-color-white">
        <div className="single-product-thumb axil-section-gap pb--20 pb_sm--0 bg-vista-white">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb--40">
                <div className="row">
                  <div className="col-lg-10 order-lg-2">
                    <div className="single-product-thumbnail-wrap zoom-gallery">
                      <div className="product-large-thumbnail single-product-thumbnail axil-product">
                        <div className="thumbnail">
                          <a
                            href={"/images/" + productDetails.ProductImage}
                            className="popup-zoom"
                          >
                            <img
                              src={"/images/" + productDetails.ProductImage}
                              alt={productDetails.ProductName}
                            />
                          </a>
                        </div>
                      </div>

                      <div className="product-quick-view position-view">
                        <a
                          href={"/images/" + productDetails.ProductImage}
                          className="popup-zoom"
                        >
                          <i className="far fa-search-plus" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb--40">
                <div className="single-product-content">
                  <div className="inner">
                    <h2 className="product-title">
                      {productDetails.ProductName}
                    </h2>
                    <span className="price-amount">
                      ₹{productDetails.Price}
                    </span>
                    <p className="description">
                      {productDetails.ProductDescription}
                    </p>
                    <div className="product-action-wrapper d-flex-center">
                      <ul className="product-action d-flex-center mb--0">
                        <li className="add-to-cart">
                          <a
                            href="#"
                            onClick={() =>
                              handleAddToCart(productDetails.ProductId)
                            }
                            className="axil-btn btn-bg-primary"
                          >
                            Add to Cart
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ProductDetail;