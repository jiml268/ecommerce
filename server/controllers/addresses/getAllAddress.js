const pool = require('../../config/db')

const getAllAddress = async (req, res) => {
  const { address_type, useID } = req.body;
 
    let sql = "";
    try {
      if (address_type === "billing") {
        sql = "SELECT * FROM billing WHERE `user_id`=? ORDER BY default_addtress DESC, id ASC";
      } else {
        sql = "SELECT * FROM shipping WHERE `user_id`=? ORDER BY default_addtress DESC, id ASC";
      }
      const allAddresses = await pool.query(sql, [useID]);
      return res.status(200).json({
        code: 200,
        Massage: `All ${address_type} address received`,
        userID: req.session.userID,
        data: allAddresses[0]
      });
    } catch (err) {
    
      return res.status(400).json({
        code: 400,
        
        error: err,
      });
    }
}
  
module.exports = getAllAddress;