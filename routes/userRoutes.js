const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');

//Rutas Publicas

router.post('/login', controller.signIn);

router.post('/register', controller.singUp);

module.exports = router;