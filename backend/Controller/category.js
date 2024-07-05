const dataAccess = require("../data-access");
const Connection = require("../connection");

exports.getCategories = async (req, res) => {
  try {
    await Connection.connect();

    try {
        const data = [
          { name: "Query", value: "SelectAll" },
        ];
      const result = await dataAccess.execute("SP_Category",data);
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