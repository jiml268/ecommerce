const pool = require('../../config/db')
const CryptoJS = require('crypto-js');
const { createCardJoiSchema } = require('../../validation/createCard')
require("dotenv").config();


     const createPayment= async(req, res) =>{

       try {
const test = await createCardJoiSchema.validateAsync(req.body);
       } catch (err) {
         console.log(err)
       return res.status(422).json({
                status: "Error in sent information",
                code: 422,
                data: {
                    Error: err
                }
            });
    }
        
         try {
        
           const { name, cardNum, lastFour, expireMth, expire_yr, user_id } = req.body
         const cryptoCard = CryptoJS.AES.encrypt(cardNum, process.env.CRYPTO_CARD).toString();
        const cryptoName = CryptoJS.AES.encrypt(name, process.env.CRYPTO_NAME).toString();
        const cryptoExpireMth = CryptoJS.AES.encrypt(expireMth, process.env.CRYPTO_MTH).toString();
           const cryptoExpireYr = CryptoJS.AES.encrypt(expire_yr.toString(), process.env.CRYPTO_YR).toString();   
 const sql = "insert into creditCard (name,cardNum,lastFour,expireMth,expire_yr,user_id ) VALUES (?,?, ?, ?, ?, ?)";
const newCard = await pool.query(sql, [
       cryptoName,cryptoCard,lastFour,cryptoExpireMth,cryptoExpireYr,user_id
      ]);
      return res.status(201).json({
        code: 201,
        Massage: "Card created",
      });
            
         } catch (err) {
           console.log("err")
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }
}
    
module.exports = createPayment;