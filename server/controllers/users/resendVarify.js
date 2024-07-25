const pool = require('../../config/db')
const { v4: uuidv4 } = require('uuid');
const  emailjs = require('@emailjs/nodejs');
require("dotenv").config();

const resendVarify = async (req, res) => {
        const varification_code = uuidv4()
        const { email, } = req.body
        try {
          const sql1 = " SELECT *  FROM `users` WHERE `email` = ? ";
             const string2 = await pool.query(sql1, [email])  
            if (string2[0][0].email_varified === 1) {
               return res.status(200).json({
                code: 200,
                Massage: "Account is already varified",
                
            });  
            }
const currentInfo = string2[0][0]
 const templateParams  = {to_email: currentInfo.email, to_first_name: currentInfo.first_name, to_last_name: currentInfo.last_name,   varification_code: varification_code,}
          emailjs
  .send(process.env.EMAILJS_SERVICE,process.env.EMAILJS_TEMPLATE , templateParams, {
    publicKey:process.env.EMAILJS_PUBLIC,
    privateKey:process.env.EMAILJS_PRIVATE, // optional, highly recommended for security reasons
  })
  .then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (err) => {
      console.log('FAILED...', err);
    },
            );
             const currenttime = new Date()
            const converttime = currenttime.toISOString().slice(0, 19).replace('T', ' ')
const sql2 = " UPDATE `users` Set `varify_sent` = ?, `varification_code` = ? WHERE `email` = ?";          
                const string3 = await pool.query(sql2, [converttime, varification_code, email])
 return res.status(200).json({
                code: 200,
                string3: string3
                
            });
         
          } catch (err) {
            return res.status(400).json({
                code: 400,
               
                error: err,
            });
        }
}
    
module.exports = resendVarify;