const dataAccess = require("../data-access");
const Connection = require("../connection");

exports.getProductsByCategory = async (req, res) => {
  try {
    await Connection.connect();

    const categoryID = req.query.categoryID;
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    const data = [
      { name: "Query", value: "SelectAll" },
      { name: "Limit", value: limit },
      { name: "Skip", value: skip },
    ];
    if (categoryID) {
      data.push({ name: "CategoryID", value: categoryID });
    }
    const result = await dataAccess.execute("SP_Products", data);

    if (result.rowsAffected[0] > 0) {
      const totalCount = result.recordset.length;
      const totalPages = Math.ceil(totalCount / limit);

      return res.status(200).json({
        status: 1,
        message: "Success.",
        data: {
          products: result.recordset,
          totalPages: totalPages,
        },
        error: null,
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "No products found for the given category.",
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
exports.getProductsDetails = async (req, res) => {
  try {
    debugger
    await Connection.connect();

    try {
      const ProductId = req.query.ProductId;
      const data = [
        { name: "Query", value: "SelectById" },
        { name: "ProductId", value: ProductId },
      ];
      const result = await dataAccess.execute("SP_Products", data);
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
