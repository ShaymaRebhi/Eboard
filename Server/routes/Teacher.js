var express = require('express');
var router = express.Router();
const TeacherController = require('../Controllers/TeacherController');
const authenticateToken =require('./VerifyToken');
require('dotenv').config() ;

router.get('/all',authenticateToken,TeacherController.getAll);
router.put('/AffectOrganization/:idOrg/:idTeach',authenticateToken,TeacherController.affecterToOrganization);
router.put('/DeleteOrganization/:idTeach',authenticateToken,TeacherController.deleteOrganizationFromStudent);

module.exports = router;
