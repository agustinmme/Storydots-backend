const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.get("/", (req, res) => {
    Product.create({
        name:"ZAPATILLAS MORADAS",
        description:"zapas amarillas",
        image_url:"una imagen de zapatillasd",
        price:10.10,
        brand_id:1
    }).then(product =>{
        res.json(product);
    }).catch(e=>{res.json(e)})
  });
  


module.exports = router;