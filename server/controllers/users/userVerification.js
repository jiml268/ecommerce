const pool = require('../../config/db')

const userVerification = async (req, res) => {
    const returnCode = req.params.verificationToken
    try {
        const sql = " SELECT IFNULL((SELECT COUNT(*)  FROM `users` WHERE `varification_code` = ? ),0) AS `result`";
        const string1 = await pool.query(sql, [returnCode])
           
        let message = ""
        if (string1[0][0].result === 0) {
            message = 'varification_code not found'
            return res.json({
                result: string1[0][0].result,
                message: message
            });
        } else {
               
            const sql1 = " SELECT *  FROM `users` WHERE `varification_code` = ?";
            const string2 = await pool.query(sql1, [returnCode])
            const currentdatetime = new Date()
            const mysqlTime = new Date(string2[0][0].varify_sent).getTime();
            const timeDifference = currentdatetime - mysqlTime
            if (timeDifference > 24 * 60 * 60 * 1000) {
                return res.json({
                    result1: string1[0][0],
                    result2: string2[0][0],
                    currentdatetime: currentdatetime,
                    convertcurrent: currentdatetime.toISOString().slice(0, 19).replace('T', ' '),
                    mysqlTime: mysqlTime,
                    difference: currentdatetime - mysqlTime,
                    message: "Verification time has expired. send a new varification code"
                });
            }

            const sql2 = " UPDATE `users` Set `varify_sent` = null, `varification_code` = null, `email_varified` = true WHERE `varification_code` = ?";
            const string3 = await pool.query(sql2, [returnCode])
               
            return res.json({
                result3: string3,
                message: "Account varified"
            });
        }
    } catch (err) {
           
        return res.json({
            error: err,
        })
    }
};

module.exports = userVerification;