const pool = require('../../config/db')
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const  emailjs = require('@emailjs/nodejs');
require("dotenv").config();

const registerUser = async (req, res) => {
        const salt = 10
        try {
            const { email, first_name, middle_init, last_name, phone_num, password, } = req.body
            const checkQuery = " SELECT IFNULL((SELECT COUNT(*)  FROM `users` WHERE `email` = ? ),0) AS `result`";
 const string1 = await   pool.query(checkQuery, [email])
           
            let message = ""
            if (string1[0][0].result !== 0) {
return res.json({
                code: 400,
                 message: "Email already Exist.  Please use a differnt email or Login",
            }); 

            }    
            const hashedPassword = await bcrypt.hash(password, salt)
            const varification_code = uuidv4()
            const currenttime = new Date()
            const converttime = currenttime.toISOString().slice(0, 19).replace('T', ' ')
const query ='insert into users (email, first_name, middle_init, last_name, phone_num, password, varification_code, varify_sent ) VALUES (?,?, ?, ?, ?, ?, ?,?)'

            const newUsers = await pool.query(query, [email, first_name, middle_init, last_name, phone_num, hashedPassword, varification_code, converttime])
            const templateParams  = {to_email: email, to_first_name: first_name, to_last_name: last_name,   varification_code: varification_code}
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
             return res.status(201).json({
                code: 201,
                 message: "user created",
            }); 
        } catch (err) {
           console.log(err)
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }
}
    
module.exports = registerUser;