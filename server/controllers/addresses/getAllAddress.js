const getAllAddress = async(req, res) => {
    const { address_type } = req.body;

    let sql = "";
    try {
      if (address_type === "billing") {
        sql = "SELECT * FROM billing WHERE `user_id`=?";
      } else {
        sql = "SELECT * FROM shipping WHERE `user_id`=?";
      }
      const allAddresses = await pool.query(sql, [req.session.userID]);
      return res.status(200).json({
        code: 200,
        Massage: `All ${address_type} address received`,
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