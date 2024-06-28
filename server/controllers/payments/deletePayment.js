const pool = require('../../config/db')

     const deletePayment= async(req, res) =>{
       
        
     try {
       
            
      } catch (err) {
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }
}
    
module.exports = deletePayment;