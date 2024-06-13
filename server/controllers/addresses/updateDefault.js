const pool = require('../../config/db')

const updateDefault = async (req, res) => {
 const {
      address_type,
     id_number,
   user_id
    
    } = req.body;

    let sql = "";
    try {
        if (address_type === 'billing') {
            sql = "UPDATE billing  Set `default_addtress` = false WHERE `user_id` = ?";
            sql2 = "UPDATE billing  Set `default_addtress` = true WHERE `id` = ?";
        } else {
            sql = "UPDATE shipping  Set `default_addtress` = false WHERE `user_id` = ?";
            sql2 = "UPDATE shipping  Set `default_addtress` = true WHERE `id` = ?";

        }
      await pool.query(sql, [user_id])
      await pool.query(sql2, [id_number])
            

        return res.status(200).json({
        code: 200,
        Massage: "Default Address updated",
      });


} catch (err) {
      
      return res.status(400).json({
        code: 400,
        
        error: err,
      });
    }
}
  
module.exports = updateDefault;