const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController')

router.get("/", controller.getAll);

router.get("/:id", controller.searchById);

router.post('/new', controller.create);
  
router.delete('/:id', controller.deleteById);
  
router.put('/:id', controller.update);

module.exports = router;