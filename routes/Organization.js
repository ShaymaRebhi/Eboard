var express = require('express');
var router = express.Router();
const OrganizationController = require('../Controllers/OrganizationController');
const authenticateToken =require('./VerifyToken');
require('dotenv').config() ;


router.get('/all',OrganizationController.getAll);
router.get('/getStudentById/:id',authenticateToken,OrganizationController.getUserById);
router.post('/payement',OrganizationController.payement);

module.exports = router;