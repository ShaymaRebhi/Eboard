var express = require('express');
var router = express.Router()
require('dotenv').config()
const TaskController = require('../Controllers/TaskController')

router.post('/add',TaskController.addTask);
router.get('/',TaskController.GetTask);
router.get('/:id',TaskController.GetOneTask);
router.delete('/:id',TaskController.deleteTask);
router.post('/update/:id',TaskController.updateTask);

module.exports = router;