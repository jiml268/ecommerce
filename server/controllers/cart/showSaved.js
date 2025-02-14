const pool = require('../../config/db')

const showSaved = async (req, res) => {

    try {
        
        const { id } = req.body

const sql = `select saveitem.quantity, saveitem.sku, pv.price, pv.colorID, pv.Stock, products.ProductName, products.Description, products.salesID,  products.ProductID, sales.salepercent from saveitem left join productvariants as pv on saveitem.sku = pv.sku
left join products on  pv.ProductID = products.ProductID
left join sales on  products.salesID = sales.salesID
where saveitem.userID = ?;`


const sql1 = `select images.ProductID, images.colorID, images.imageName from saveitem left join productvariants as pv on saveitem.sku = pv.sku
join images on  pv.ProductID = images.ProductID and  (pv.colorID = images.colorID OR(pv.colorID IS NULL AND images.colorID IS NULL))
where saveitem.userID = ?;`
        const items = await pool.query(sql, [id])
        const images = await pool.query(sql1, [id])
          return res.status(200).json({
                code: 200,
              items: items[0],
              images: images[0]
                
            });          
    } catch (err) {
            return res.status(400).json({
                code: 400,
                Massage: err,
                error: err,
            });
        }


    }

module.exports = showSaved;