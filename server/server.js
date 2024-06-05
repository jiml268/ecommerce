require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const usersRoutes = require("./routers/userRouter");
const addressRoutes = require("./routers/addressRouter");
const session = require('express-session');
const sess = {
  secret: process.env.JWT_privateKey,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
};
app.use(session(sess));

app.use(cors());
app.use(express.json());
app.all('/api', function(req, res) {
    return res.status(200).json({
        code: 200,
        Massage: "Corrected",
      });
})

// app.use("/api", usersRoutes);
// app.use("/api", addressRoutes);

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});