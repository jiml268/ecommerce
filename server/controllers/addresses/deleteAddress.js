const pool = require('../../config/db')

const deleteAddress = async (req, res) => {
    const { address_type, id_number } = req.body;

    let sql = "";
    try {
      if (address_type === "billing") {
        sql = "DELETE FROM billing WHERE `id`=?";
      } else {
        sql = "DELETE FROM shipping WHERE `id`=?";
      }
      await pool.query(sql, [id_number]);
      return res.status(200).json({
        code: 200,
        Massage: "Address delete",
      });
    } catch (err) {
   
      return res.status(400).json({
        code: 400,
        
        error: err,
      });
    }
}
  
module.exports = deleteAddress;