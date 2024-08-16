require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes");


app.use(cors());
app.use(express.json());
app.use("/api", usersRoutes);
app.use("/api", productsRoutes);


const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});