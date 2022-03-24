var express = require('express');
var router = express.Router();
const ReclamationController = require('../Controllers/ReclamationController')
const authenticateToken =require('./VerifyToken')
require('dotenv').config()  


router.post('/add/:id',ReclamationController.add);
router.get('/all',ReclamationController.all);
router.delete('/:id',ReclamationController.delete);



module.exports = router;