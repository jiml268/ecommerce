const pool = require('../../config/db')
const bcrypt = require('bcrypt');

const updatePassWord = async (req, res) => {
    const { oldPassword, newPassword, email} = req.body
    

    try {
          const sql = "SELECT *  FROM `users` WHERE `email` = ? ";
             const string2 = await pool.query(sql, [email])  
         
        const validatePW = await bcrypt.compare(oldPassword, string2[0][0].password)
        if (!validatePW) {
             return res.json({
            status: "Incorrect current password",
            code: 401,
                message: "Your current password is incorrect.  Please try again."
            
        });
             };
        const salt = 10
        const hashedPassword = await bcrypt.hash(newPassword, salt)
       

         const sql2 = "UPDATE `users` Set `password` = ? WHERE `email` = ?";
            await pool.query(sql2, [hashedPassword,email])
            return res.json({
                     code: 200,
                message: "Password has been updated",  
                });  

         } catch (err) {
        
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }
}

module.exports = updatePassWord;