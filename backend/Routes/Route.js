var express = require("express");
const User = require("../Controller/user");
const verifyToken = require("../middlewares/verifyToken");
const Products = require("../Controller/Product");
const Category = require("../Controller/category");
var Cart = require("../Controller/cart");
var router = express.Router();

router.post("/auth/login", User.setLogin);
router.get("/auth/products", verifyToken, Products.getProductsByCategory);
router.get("/auth/products/categories", verifyToken, Category.getCategories);
router.get("/auth/products/details", verifyToken, Products.getProductsDetails);
router.post("/auth/cart/add", verifyToken, Cart.addToCart);
router.get("/auth/cart/getCart", verifyToken, Cart.getCart);
router.delete("/auth/cart/removeCart", verifyToken, Cart.removeFromCart);
router.post("/auth/user/updatepassword",verifyToken,User.updatePassword);
router.get("/auth/user/getuser", verifyToken, User.getUsers);

module.exports = router;
