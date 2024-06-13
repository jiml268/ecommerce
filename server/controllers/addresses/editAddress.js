const pool = require('../../config/db')

const editAddress = async (req, res) => {
  const { address, type, setTodefault } = req.body
  console.log('address', address)
  console.log('type', type)
  console.log('setTodefault', setTodefault)
  
    const {id,
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
  } = address;
    console.log('Phone_num', Phone_num)
    let sql = "";
    try {
      if (type === "billing") {
        sql =
          "UPDATE billing  Set `first_name` = ?,`middle_init` = ?,`last_name`= ?,`address_line1`=?,`address_line2`=?,`city`=?,`state`=?,`zip`=?,`Phone_num`=?,`comments`=?,`default_addtress`=? WHERE`id` = ?";
      } else {
        sql =
          "UPDATE shipping  Set `first_name` = ?,`middle_init` = ?,`last_name`= ?,`address_line1`=?,`address_line2`=?,`city`=?,`state`=?,`zip`=?,`Phone_num`=?,`comments`=?,`default_addtress`=? WHERE`id` = ?";
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
        setTodefault,
        id,
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