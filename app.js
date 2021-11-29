const express = require("express");
const app = express();
require("dotenv").config();
require("./models/associations");
const sequelize = require("./database/db");

//Setting
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.urlencoded());
app.use(express.json());

//Routes
const routes = require("./routes/index");
app.use(routes);

//Handler Not found
app.use((req, res, next) => {
  const erro = new Error("Not Found");
  erro.status = 404;
  next(erro);
});

//Handler errors
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ force: false }).authenticate();
    console.log(`Example app listening at http://localhost:${PORT}`);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
