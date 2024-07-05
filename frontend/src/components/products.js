import React, { useState, useEffect } from "react";
import service from "../services/service";
import {Link} from "react-router-dom";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserID = localStorage.getItem("userID");
    if (storedToken) {
      setToken(storedToken);
      setUserID(storedUserID);
      fetchCategories(storedToken);
      fetchProducts(storedToken, null, currentPage);
    }
  }, []);

  const fetchCategories = (token) => {
    service
      .getCategory(token)
      .then((response) => {
        if (response.data.status) {
          setCategories(response.data.data);
        } else {
          console.error("Failed to fetch categories:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const fetchProducts = (token, categoryID, page) => {
    const skip = (page - 1) * limit;
    service
      .getProducts(token, limit, skip, categoryID)
      .then((response) => {
        if (response.data.status) {
          setProducts(response.data.data.products);
          setTotalPages(response.data.data.totalPages);
          setCurrentPage(page);
        } else {
          console.error("Failed to fetch products:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleCategoryClick = (categoryID) => {
    fetchProducts(token, categoryID, 1); // Fetch products for the clicked category starting from page 1
  };

  const handlePageChange = (page) => {
    fetchProducts(token, null, page); // Fetch products for the current category on page change
  };

  const handleAddToCart = (productID) => {
    service
      .addToCart(token,userID, productID,1)
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
      <div className="axil-breadcrumb-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-8">
              <div className="inner">
                <ul className="axil-breadcrumb">
                  <li className="axil-breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="separator" />
                  <li
                    className="axil-breadcrumb-item active"
                    aria-current="page"
                  >
                    My Account
                  </li>
                </ul>
                <h1 className="title">Explore All Products</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-4">
              <div className="inner">
                <div className="bradcrumb-thumb">
                  <img
                    src="etrade/assets/images/product/product-45.png"
                    alt="Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumb Area  */}
      {/* Start Shop Area  */}
      <div className="axil-shop-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="axil-shop-sidebar">
                <div className="d-lg-none">
                  <button className="sidebar-close filter-close-btn">
                    <i className="fas fa-times" />
                  </button>
                </div>
                <div className="toggle-list product-categories active">
                  <h6 className="title">CATEGORIES</h6>
                  <div className="shop-submenu">
                    <ul>
                      {categories.map((category) => (
                        <li
                          key={category.CategoryID}
                          className={
                            category.CategoryID === currentPage
                              ? "current-cat"
                              : ""
                          }
                        >
                          <a
                            href="#"
                            onClick={() =>
                              handleCategoryClick(category.CategoryID)
                            }
                            onMouseEnter={(e) =>
                              (e.target.style.cursor = "pointer")
                            }
                          >
                            {category.CategoryName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* End .axil-shop-sidebar */}
            </div>
            <div className="col-lg-9">
              <div className="row row--15">
                {/* Product listing */}
                {products.map((product) => (
                  <div key={product.ProductID} className="col-xl-4 col-sm-6">
                    <div className="axil-product product-style-one mb--30">
                      <div className="thumbnail">
                        <Link to={"/products/" + product.ProductId}>
                          <img
                            className="img-thumbnail"
                            src={"images/" + product.ProductImage}
                            alt={product.ProductName}
                          />
                        </Link>
                        <a href="#"></a>
                        {/* Product hover actions */}
                      </div>
                      <div className="product-content">
                        <div className="inner">
                          <h5 className="title">
                            <a href="">{product.ProductName}</a>
                          </h5>
                          <div className="product-hover-action">
                            <ul className="cart-action">
                              <li className="select-option">
                                <a
                                  href="#"
                                  onClick={() =>
                                    handleAddToCart(product.ProductId)
                                  }
                                >
                                  Add to Cart
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="product-price-variant">
                            <span className="price current-price">
                              ${product.Price}
                            </span>
                            {/* Additional product details */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* End Single Product */}
              </div>
              <nav aria-label="Product navigation">
                <ul className="pagination justify-content-center">
                  {[...Array(totalPages).keys()].map((page) => (
                    <li
                      key={page + 1}
                      className={`page-item ${
                        currentPage === page + 1 ? "active" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => handlePageChange(page + 1)}
                      >
                        {page + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {/* End .container */}
      </div>
    </main>
  );
};

export default Products;
