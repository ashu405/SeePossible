const dataAccess = require("../data-access");
const Connection = require("../connection");

exports.addToCart = async (req, res) => {
  const { UserID, ProductId, Quantity } = req.body;

  if (!UserID || !ProductId || !Quantity) {
    return res.status(400).json({
      status: 0,
      message: "Missing required fields.",
      data: null,
      error: null,
    });
  }

  try {
    await Connection.connect();

    const data = [
      { name: "Query", value: "INSERT" },
      { name: "UserID", value: UserID },
      { name: "ProductId", value: ProductId },
      { name: "Quantity", value: Quantity },
    ];
    const result = await dataAccess.execute("SP_Cart", data);

    if (result.rowsAffected[0] > 0) {
      return res.status(200).json({
        status: 1,
        message: "Added Successfully",
        data: result.recordset,
        error: null,
      });
    } else {
      return res.status(500).json({
        status: 0,
        message: "Error.",
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

exports.getCart = async (req, res) => {
  const UserID = req.query.UserID;

  if (!UserID) {
    return res.status(400).json({
      status: 0,
      message: "Missing UserID.",
      data: null,
      error: null,
    });
  }

  try {
    await Connection.connect();

    const data = [
      { name: "Query", value: "SelectAll" },
      { name: "UserID", value: UserID },
    ];
    const result = await dataAccess.execute("SP_Cart", data);

    if (result.rowsAffected[0] > 0) {
      return res.status(200).json({
        status: 1,
        message: "Success.",
        data: result.recordset,
        error: null,
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "No items in cart.",
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

exports.removeFromCart = async (req, res) => {
  const { UserID, ProductId } = req.body;

  if (!UserID || !ProductId) {
    return res.status(400).json({
      status: 0,
      message: "Missing required fields.",
      data: null,
      error: null,
    });
  }

  try {
    await Connection.connect();

    const data = [
      { name: "Query", value: "Delete" },
      { name: "UserID", value: UserID },
      { name: "ProductId", value: ProductId },
    ];
    const result = await dataAccess.execute("SP_Cart", data);

    if (result.rowsAffected[0] > 0) {
      return res.status(200).json({
        status: 1,
        message: "Successfully Deleted.",
        data: result.recordset,
        error: null,
      });
    } else {
      return res.status(500).json({
        status: 0,
        message: "Failed to remove product from cart.",
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
