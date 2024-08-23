const pool = require('../../config/db')

const getSingleProduct = async (req, res) => {
         
    try {
        const { productID } = req.body;
         const sql = "select * from products as p INNER JOIN productvariants as pv ON p.ProductID= pv.ProductID  INNER JOIN  productvariantspecs as pvs on pv.VariantID = pvs.VariantID INNER JOIN  specifications as s on pvs.SpecID = s.SpecID where p.ProductID = ?; ";
     const product = await pool.query(sql, [productID])
     
          return res.status(200).json({
                code: 200,
                product: product[0],
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

module.exports = getSingleProduct;