const pool = require('../../config/db')

const updateProfile = async (req, res) => {
    const {id,  email, first_name, last_name, phone_num } = req.body
        
    try {
         const sql2 = "UPDATE `users` Set `email` = ?, `first_name` = ?, `last_name` = ?, `phone_num` = ? WHERE `id` = ?";
            const string3 = await pool.query(sql2, [email, first_name, last_name, phone_num, id])
            return res.json({
                     code: 200,
                message: "Profile has been updated",  
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

module.exports = updateProfile;