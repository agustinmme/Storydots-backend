const express = require('express')
const router = express.Router()
const controller = require('../controllers/brandController')
const auth = require('../middlewares/auth');

//Rutas publicas

router.get("/", controller.getAll);
 
router.get("/:id", controller.searchById);

//Rutas Privadas

router.post('/new',auth, controller.create);

router.delete('/:id',auth, controller.deleteById);
  
router.put('/:id',auth, controller.update);

module.exports = router