const jwt = require("jsonwebtoken");
const SECRET_KEY =
  "7350a196db4108c975dd622f46e2cd58efb9d54c61a8d55a41377af6db06ce0d";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({
      status: 0,
      message: "No token provided.",
      error: null,
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      status: 0,
      message: "Invalid token format.",
      error: null,
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        status: 0,
        message: "Failed to authenticate token.",
        error: err.message,
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
