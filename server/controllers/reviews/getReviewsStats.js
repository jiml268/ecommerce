const pool = require('../../config/db')

const getReviewsStats = async (req, res) => {
         
    try {
        const { productID } = req.body
        
        const sql = "SELECT ratings.rating,ratings.createDate,reviews.review,  reviews.title, reviews.name  FROM ratings left join reviews ON ratings.ID =  reviews.ID WHERE ratings.productID=?;";
        const reviewStats = await pool.query(sql, [productID])
const sql1 = "select rating, count(rating) as count, sum(rating) as sum from ratings where productID = ? group by rating order by rating desc  ;"
const reviewTotals = await pool.query(sql1, [productID])
        

          return res.status(200).json({
              code: 200,
              reviewStats: reviewStats[0],
              reviewTotals: reviewTotals[0]
            });          
 } catch (err) {
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }

}

module.exports = getReviewsStats;