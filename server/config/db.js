const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10
}).promise();

module.exports = pool;