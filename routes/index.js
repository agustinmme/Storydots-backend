const express = require("express");
const router = express.Router();
const productsRoutes = require("./productsRoutes");
const brandsRoutes = require("./brandsRoutes");
const usersRoutes = require("./userRoutes");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenido / Welcome" });
});

router.use("/products", productsRoutes);

router.use("/brands", brandsRoutes);

router.use("/users", usersRoutes);

module.exports = router;
