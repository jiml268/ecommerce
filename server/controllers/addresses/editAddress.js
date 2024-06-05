  const editAddress= async(req, res) => {
    const {
      first_name,
      middle_init,
      last_name,
      address_line1,
      address_line2,
      city,
      state,
      zip,
      Phone_num,
      comments,
      default_addtress,
      address_type,
      id_number,
    } = req.body;

    let sql = "";
    try {
      if (address_type === "billing") {
        sql =
          "UPDATE billing  Set `first_name` = ?,`middle_init` = ?,`last_name`= ?,`address_line1`=?,`address_line2`=?,`city`=?,`state`=?,`zip`=?,`Phone_num`=?,`billing_comments`=?,`default_addtress`=? WHERE`id` = ?";
      } else {
        sql =
          "UPDATE shipping  Set `first_name` = ?,`middle_init` = ?,`last_name`= ?,`address_line1`=?,`address_line2`=?,`city`=?,`state`=?,`zip`=?,`Phone_num`=?,`shipping_comments`=?,`default_addtress`=? WHERE`id` = ?";
      }
      await pool.query(sql, [
        first_name,
        middle_init,
        last_name,
        address_line1,
        address_line2,
        city,
        state,
        zip,
        Phone_num,
        comments,
        default_addtress,
        id_number,
      ]);
      return res.status(200).json({
        code: 200,
        Massage: "Address updated",
      });
    } catch (err) {
      
      return res.status(400).json({
        code: 400,
        
        error: err,
      });
    }
}
  
module.exports = editAddress;