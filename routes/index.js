const express = require('express');
const router = express.Router();



//rutas
const productsRoutes = require('./productsRoutes');


router.get('/', (req, res)=>{
    res.status(200).json({message: "Bienvenido / Welcome"});
})


router.use("/products", productsRoutes)

module.exports = router;
