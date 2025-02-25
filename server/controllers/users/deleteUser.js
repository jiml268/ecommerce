const pool = require("../../config/db");

const deleteUser = async (req, res) => {
  const { email, id } = req.body;

  try {
    const sql = " DELETE FROM `users` WHERE `email` = ? ";
    const sql1 = " DELETE FROM `saveitem` WHERE `userID` = ? ";
    const sql2 =
      "insert into `orderitems_deletedaccount` select oi.* from `orderitems` as oi inner join `orders`  on oi.orderId = orders.orderid  where orders.id = ?;";
    const sql3 =
      "insert into `orders_deletedaccount` select * from `orders` where id = ?;";
    const sql4 =
      " DELETE orderitems FROM orderitems INNER JOIN orders ON orderitems.orderId = orders.orderId and orders.id = ?;";
    const sql5 = " DELETE FROM `orders` WHERE `id` = ? ";

    await pool.query(sql, [email]);
    await pool.query(sql1, [id]);
    await pool.query(sql2, [id]);
    await pool.query(sql3, [id]);
    await pool.query(sql4, [id]);
    await pool.query(sql5, [id]);

    return res.status(200).json({
      code: 200,
      message: "Account Deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      code: 400,
      Massage: err,
      error: err,
    });
  }
};

module.exports = deleteUser;
