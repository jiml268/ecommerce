const pool = require('../../config/db')
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {
    const { email, password } = req.body
        
     try {
        const sql = " SELECT IFNULL((SELECT COUNT(*)  FROM `users` WHERE `email` = ? ),0) AS `result`";
         const string1 = await pool.query(sql, [email]) 
         if (string1[0][0].result === 0) {

             message = 'email not found'
             return res.json({
                 code: 403,
                 result: string1[0][0].result,
                 message: message
             });
         } else {
           const sql1 = " SELECT *  FROM `users` WHERE `email` = ? ";
             const string2 = await pool.query(sql1, [email])  
            

             if (string2[0][0].email_varified === 0) {
                 return res.json({
                 code: 403,
                 result: string2[0][0],
                 message: "Your account has not been varified.  Please check your Email"
             });
         }
             const validatePW = await bcrypt.compare(password, string2[0][0].password)
                 if (!validatePW) {
             return res.json({
            status: "Unauthorized",
            code: 401,
                message: "Unauthorized user. Incorrect password."
            
        });
             };
             
              return res.json({
            status: "logged in",
            code: 200,
            email: string2[0][0].email,
            id: string2[0][0].id,
            message: "login successful"
            
        });

              
         }
         
     } catch (err) {
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }
}
    
module.exports = userLogin;