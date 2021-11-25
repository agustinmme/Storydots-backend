const express = require("express");
const app = express();
const sequelize = require("./database/db");



//Setting
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.urlencoded());
app.use(express.json());

//Routes
const routes = require('./routes/index');
app.use(routes);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Example app listening at http://localhost:${PORT}`);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
