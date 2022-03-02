var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController')
const authenticateToken =require('./VerifyToken')
require('dotenv').config()  

/* GET users listing. */

router.get('/connect',authenticateToken,UserController.getUserConnect);

router.get('/all',authenticateToken,UserController.getAll);

router.post('/signup',UserController.signup);

router.post('/login',UserController.signin);

module.exports = router;
