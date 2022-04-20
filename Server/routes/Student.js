var express = require('express');
var router = express.Router();
const StudentController = require('../Controllers/StudentController');
const authenticateToken =require('./VerifyToken');
require('dotenv').config() ;


router.get('/all',authenticateToken,StudentController.getAll);
router.put('/AffectOrganization/:idOrg/:idStudent',authenticateToken,StudentController.affecterToOrganization);
router.put('/DeleteOrganization/:idStudent',authenticateToken,StudentController.deleteOrganizationFromStudent);
module.exports = router;