const pool = require("../../config/db");

const removedItem = async (req, res) => {
  try {
    const { sku, id } = req.body;
    const sql = "DELETE FROM saveitem WHERE userID =  ? AND sku =?";
    await pool.query(sql, [id, sku]);
    return res.status(200).json({
      code: 200,
      message: "Item removed",
    });
  } catch (err) {
    return res.status(400).json({
      code: 400,
      Massage: err,
      error: err,
    });
  }
};

module.exports = removedItem;
