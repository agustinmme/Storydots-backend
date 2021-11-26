const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');
const auth = require('../middlewares/auth');

//Rutas Publicas

router.get("/", controller.getAll);

router.get("/:id", controller.searchById);

//Rutas Privadas

router.post('/new',auth, controller.create);
  
router.delete('/:id',auth, controller.deleteById);
  
router.put('/:id',auth, controller.update);

module.exports = router;