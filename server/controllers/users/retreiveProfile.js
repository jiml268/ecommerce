const pool = require('../../config/db')

const retreiveProfile = async (req, res) => {
    const { id } = req.body
        
    try {
         const sql = "SELECT id, email, first_name, last_name, phone_num FROM `users` WHERE `id` = ? ";
             const string2 = await pool.query(sql, [id])  
        
         return res.json({
             code: 200,
             data: string2,
                message: "Profile retrieved",  
                });  

         } catch (err) {
        
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }
}

module.exports = retreiveProfile;