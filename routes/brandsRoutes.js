const express = require('express')
const router = express.Router()
const controller = require('../controllers/brandController')

router.get("/", controller.getAll);

router.post('/new', controller.create);
 
router.get("/:id", controller.searchById);
  
router.delete('/:id', controller.deleteById);
  
router.put('/:id', controller.update);

module.exports = router