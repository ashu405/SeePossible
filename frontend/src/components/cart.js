import React, { useState, useEffect } from "react";
import service from "../services/service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    debugger
    const storedToken = localStorage.getItem("token");
    const storedUserID = localStorage.getItem("userID");
    if (storedToken) {
      setToken(storedToken);
      setUserID(storedUserID);
      fetchCart(storedToken);
    }
  }, []);

  const fetchCart = (token) => {
debugger
    service
      .getCart(token, localStorage.getItem("userID"))
      .then((response) => {
        if (response.data.status) {
          setCartItems(response.data.data);
          calculateSubtotal(response.data.data);
        } else {
          console.error("Failed to fetch cart items:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  const calculateSubtotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.Price * item.Quantity,
      0
    );
    setSubtotal(total);
  };

  const handleRemove = (ProductId) => {
    debugger
    service
      .removeFromCart(token, ProductId, localStorage.getItem("userID"))
      .then((response) => {
        if (response.data.status) {
            toast.success("Item removed from cart");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          fetchCart(token);
        } else {
          console.error(
            "Failed to remove item from cart:",
            response.data.message
          );
        }
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  return (
    <main className="main-wrapper">
      <div className="axil-product-cart-area axil-section-gap">
        <div className="container">
          <div className="axil-product-cart-wrap">
            
            {cartItems.length === 0 ? (
              <div className="empty-cart-message">
                <p className="emptycart">Your cart is empty</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table axil-product-table axil-cart-table mb--40">
                  <thead>
                    <tr>
                      <th scope="col" className="product-remove" />
                      <th scope="col" className="product-thumbnail">
                        Product
                      </th>
                      <th scope="col" className="product-title" />
                      <th scope="col" className="product-price">
                        Price
                      </th>
                      <th scope="col" className="product-quantity">
                        Quantity
                      </th>
                      <th scope="col" className="product-subtotal">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.ProductId}>
                        <td className="product-remove">
                          <a
                            href="#"
                            className="remove-wishlist"
                            onClick={() => handleRemove(item.ProductId)}
                          >
                            <i className="fal fa-times" />
                          </a>
                        </td>
                        <td className="product-thumbnail">
                          <a href={`single-product/${item.ProductId}`}>
                            <img
                              src={`images/${item.ProductImage}`}
                              alt={item.ProductName}
                            />
                          </a>
                        </td>
                        <td className="product-title">
                          <a href={`single-product/${item.ProductId}`}>
                            {item.ProductName}
                          </a>
                        </td>
                        <td className="product-price" data-title="Price">
                          <span className="currency-symbol">₹</span>
                          {item.Price}
                        </td>
                        <td className="product-quantity" data-title="Qty">
                          <div className="pro-qty">
                            <input
                              type="number"
                              className="quantity-input"
                              defaultValue={item.Quantity}
                              readOnly
                            />
                          </div>
                        </td>
                        <td className="product-subtotal" data-title="Subtotal">
                          <span className="currency-symbol">₹</span>
                          {item.Price * item.Quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
