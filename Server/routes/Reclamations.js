var express = require('express');
var router = express.Router();
const ReclamationController = require('../Controllers/ReclamationController')
const authenticateToken =require('./VerifyToken')
require('dotenv').config()  


router.post('/add/:id',authenticateToken,ReclamationController.add);
router.get('/all',authenticateToken,ReclamationController.all);
router.delete('/:id',authenticateToken,ReclamationController.delete);



module.exports = router;