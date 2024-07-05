const dataAccess = require("../data-access");
const Connection = require("../connection");
const jwt = require("jsonwebtoken");

const SECRET_KEY =
  "7350a196db4108c975dd622f46e2cd58efb9d54c61a8d55a41377af6db06ce0d";

exports.setLogin = async (req, res) => {
  try {
    await Connection.connect();

    const data = [
      { name: "Query", value: "Login" },
      { name: "UserName", value: req.body.username },
      { name: "Password", value: req.body.password },
    ];

    try {
      const result = await dataAccess.execute("SP_User", data);
      if (result.rowsAffected[0] === 1) {
        const userdata = result.recordset;
        const token = jwt.sign(
          { id: userdata.UserID, username: userdata.UserName },
          SECRET_KEY,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          status: 1,
          message: "User Login Successfully.",
          data: userdata,
          token: token,
          error: null,
        });
      } else {
        return res.status(200).json({
          status: 0,
          message: "Invalid username or password.",
          data: null,
          error: null,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 0,
        message: error.message,
        data: null,
        error: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message,
      data: null,
      error: null,
    });
  }
};
exports.updatePassword = async (req, res) => {
  try {
    await Connection.connect();
    console.log(req.body); // Log the request body to inspect data

    const { UserID, FullName, UserName, Password } = req.body;
    console.log(UserID, FullName, UserName, Password); // Check individual values
    //const { UserID, FullName, UserName, Password } = req.body;

    // First, verify current password (optional step depending on your security requirements)

    // Example of data to pass to the stored procedure or query
    const data = [
      { name: "Query", value: "UpdatePassword" },
      { name: "UserID", value: UserID },
      { name: "FullName", value: FullName },
      { name: "UserName", value: UserName },
      { name: "Password", value: Password },
    ];

    try {
      const result = await dataAccess.execute("SP_User", data);
      if (result.rowsAffected[0] === 1) {
        return res.status(200).json({
          status: 1,
          message: "Password updated successfully.",
          data: null,
          error: null,
        });
      } else {
        return res.status(200).json({
          status: 0,
          message:
            "Failed to update password. Invalid current password or user ID.",
          data: null,
          error: null,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 0,
        message: error.message,
        data: null,
        error: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message,
      data: null,
      error: null,
    });
  }
};
exports.getUsers = async (req, res) => {
  try {
    await Connection.connect();

    try {
      const  UserID  = req.query.UserID;
      const data = [
        { name: "Query", value: "SelectAll" },
        { name: "UserID", value: UserID },
      ];
      const result = await dataAccess.execute("SP_User", data);
      return res.status(200).json({
        status: 1,
        message: "Success.",
        data: result.recordset,
        error: null,
      });
    } catch (error) {
      return res.status(500).json({
        status: 0,
        message: error.message,
        data: null,
        error: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message,
      data: null,
      error: null,
    });
  }
};
