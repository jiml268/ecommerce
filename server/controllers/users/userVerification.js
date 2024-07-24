const pool = require('../../config/db')

const userVerification = async (req, res) => {
    const { returnCode, returnEmail } = req.body

    try {
        const sql = " SELECT IFNULL((SELECT COUNT(*)  FROM `users` WHERE `varification_code` = ? ),0) AS `result`";
        const string1 = await pool.query(sql, [returnCode])
           
        let message = ""
        if (string1[0][0].result === 0) {
const sql1 = " SELECT *  FROM `users` WHERE `email` = ?";
            const string2 = await pool.query(sql1, [returnEmail])


            if (string2[0].length === 0) {
                message = 'Varification code & emaail not found'
                return res.json({
                    code: 406,
                    string2: string2,
                    result: string2[0].length,
                    message: message
                });

            } else {
                if (string2[0][0].email_varified === 1)
                {
                    message = 'Already varified'
                return res.json({
                    code: 409,
                     string2: string2,
                    result: string2[0][0].result,
                    message: message
                });
                } else {
                  message = 'varification_code not found'
                return res.json({
                    code: 404,
                    result: string1[0][0].result,
                    message: message
                });   

            }
            } 
           
        } else {
               
            const sql1 = " SELECT *  FROM `users` WHERE `varification_code` = ?";
            const string2 = await pool.query(sql1, [returnCode])
            const currentdatetime = new Date()
            const mysqlTime = new Date(string2[0][0].varify_sent).getTime();
            const timeDifference = currentdatetime - mysqlTime
            if (timeDifference > 24 * 60 * 60 * 1000) {
                return res.json({
                     code: 410,
                    message: "Verification time has expired. send a new varification code"
                });
            }

            const sql2 = " UPDATE `users` Set `varify_sent` = null, `varification_code` = null, `email_varified` = true WHERE `varification_code` = ?";
            const string3 = await pool.query(sql2, [returnCode])
            return res.json({
                     code: 200,
                    message: "Verification complete"
                });  
           
        }
    } catch (err) {
          console.log(err) 
        return res.json({
            error: err,
        })
    }
};

module.exports = userVerification;