const pool = require('../../config/db')

     const deleteUser= async(req, res) =>{
        const { email, } = req.body
        
     try {
         const sql = " DELETE FROM `users` WHERE `email` = ? ";
         const string1 = await pool.query(sql, [email])
          return res.status(200).json({
                code: 200,
                string1: string1,
            });

            
      } catch (err) {
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }
}
    
module.exports = deleteUser;