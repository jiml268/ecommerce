const pool = require('../../config/db')
const bcrypt = require('bcrypt');

const editUser = async (req, res) => {
     const salt = 10
     const { email, newEmail, first_name, middle_init, last_name, phone_num, password } = req.body
   
    

     try {
          if (password) {
         const hashedPassword = await bcrypt.hash(password, salt)
         const sql1 = " UPDATE `users` Set  `password` = ? WHERE`email` = ?";          
                const string1 = await pool.query(sql1, [hashedPassword, email])
     }   
         
            const sql2 = " UPDATE `users` Set `email` = ?, `first_name` = ?, `middle_init` = ?, `last_name` = ?, `phone_num` = ? WHERE`email` = ?";          
         const string3 = await pool.query(sql2, [newEmail, first_name, middle_init, last_name, phone_num, email])
          return res.status(200).json({
                code: 200,
                Massage: "User info has been updated",
            
            });


     } catch (err) {
         
            return res.status(400).json({
                code: 400,
                
                error: err,
            });
        }
}
    
module.exports = editUser;