const pool = require('../../config/db')

const getReviews = async (req, res) => {
         
    try {
        const { productID } = req.body
        
        const sql = "SELECT ratings.rating,reviews.review,  reviews.title, reviews.name  FROM ratings left join reviews ON ratings.ID =  reviews.ID WHERE ratings.productID=?;";
        const showReviews = await pool.query(sql, [productID])
const sql1 = "select rating, count(rating) as count, sum(rating) as sum from ratings where productID = ? group by rating order by rating desc  ;"
const reviewTotals = await pool.query(sql1, [productID])
        

          return res.status(200).json({
              code: 200,
              showReviews: showReviews[0],
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

module.exports = getReviews;