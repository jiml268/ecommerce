const pool = require('../../config/db')
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
require("dotenv").config();




const resetPassword = async (req, res) => {
    const { password, email} = req.body
  const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});


const mailOptions = {
  from: 'Ecommerce Support',
  to: email,
  subject: 'Password reset',
    // text: 'That was easy!'
    html: `<h1>Password reset</h1><br><br><p>We have received your request to reset your password.</p><br><br><p>your new password is <b>${password}</b>. <br><br><p>Once you sign in with that password you can change it. </p><br><br>`
};

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
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
         const sql2 = "UPDATE `users` Set `password` = ? WHERE `email` = ?";
        const string3 = await pool.query(sql2, [hashedPassword,email])
         transporter.sendMail(mailOptions, function(error, info){
  if (error) {
      console.log(error);
       return res.json({
           code: 204,
           error: error,
                message: "An error has occurred",  
                }); 
  } else {
      console.log('Email sent: ' + info.response);
       return res.json({
                     code: 200,
                message: "Password has been changed",  
                }); 
  }
});
         
         
         
         
            

        }
         } catch (err) {
         console.log(err)
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }
}

module.exports = resetPassword;