const pool = require('../../config/db')

const createReview = async (req, res) => {
         
    try {
        const { sku, starValue, productReview, userID } = req.body
        console.log("sku", sku)
        const sql = "SELECT * FROM `productvariants` where `sku` = ?";
        const getProduct = await pool.query(sql, [sku])
        const currentProduct = getProduct[0][0].ProductID
        const sql1 = "INSERT INTO ratings (productID, rating, userid) VALUE(?,?,?);"
        const newRating = await pool.query(sql1, [currentProduct, starValue, userID])
        console.log(newRating[0].insertId)
             const sql2 = "INSERT INTO reviews (id, review, title,name) VALUE(?,?,?,?);"
await pool.query(sql2, [newRating[0].insertId, productReview.review, productReview.title,productReview.name])
          return res.status(200).json({
                code: 200,
                Message: "review created",
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

module.exports = createReview;