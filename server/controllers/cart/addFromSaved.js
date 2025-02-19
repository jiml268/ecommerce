const pool = require("../../config/db");

const addFromSaved = async (req, res) => {
  try {
    const { cartNun, sku, quantity, id } = req.body;
    const sql = "insert into cart (cartNun, sku, quantity,id) value (?,?,?,?);";
    await pool.query(sql, [cartNun, sku, quantity, id]);
    return res.status(200).json({
      code: 200,
      message: "Item Added",
    });
  } catch (err) {
    return res.status(400).json({
      code: 400,
      Massage: err,
      error: err,
    });
  }
};

module.exports = addFromSaved;
