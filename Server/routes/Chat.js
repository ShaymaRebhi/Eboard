var express = require('express');
var router = express.Router();
const authenticateToken =require('./VerifyToken')
require('dotenv').config() 
const ChatController = require('../Controllers/ChatController');


router.post('/add',ChatController.addMsg);
router.post('/all',ChatController.getAllMsg);




module.exports = router;