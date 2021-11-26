const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');

router.post('/login', controller.signIn);

router.post('/register', controller.singUp);

module.exports = router;