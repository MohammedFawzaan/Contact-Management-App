const express = require('express');
const router = express.Router();
const {Register, Login, Current} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.route('/register').post(Register);

router.route('/login').post(Login);

router.get('/current', validateToken, Current);

module.exports = router;