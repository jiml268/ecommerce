const pool = require('../../config/db')
 
const addAddress = async (req, res) => {
  console.log(req.body)
  const { address, type, setTodefault } = req.body
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
      user_id,
    } = address;
console.log(first_name,
      middle_init,
      last_name)
    let sql = "";
    try {
      if (type === "billing") {
        sql =
          "insert into billing (first_name,middle_init,last_name,address_line1,address_line2,city,state,zip,Phone_num,comments,default_addtress, user_id ) VALUES (?,?, ?, ?, ?, ?, ?,?,?, ?, ?, ?)";
      } else {
        sql =
          "insert into shipping (first_name,middle_init,last_name,address_line1,address_line2,city,state,zip,Phone_num,comments,default_addtress, user_id ) VALUES (?,?, ?, ?, ?, ?, ?,?,?, ?, ?, ?)";
      }
      const newUsers = await pool.query(sql, [
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
        user_id
      ]);
      return res.status(201).json({
        code: 201,
        Massage: "Address created",
      });
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        code: 400,
        Massage: err,
       
      });
    }
}
  
module.exports = addAddress;