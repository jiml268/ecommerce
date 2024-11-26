const pool = require('../../config/db')

const allOrders = async (req, res) => {
     const { id, } = req.body     
 try {
         const sql = "select * from orders where id = ? order by orderdate desc; ";
     const ordersList = await pool.query(sql, [id]);
     
          return res.status(200).json({
                code: 200,
              ordersList: ordersList[0],
                
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

module.exports = allOrders;