var express = require('express');
var router = express.Router()
require('dotenv').config()
const TaskController = require('../Controllers/TaskController')

router.post('/add',TaskController.addTask);
router.get('/',TaskController.GetTask)
router.delete('/:id',TaskController.deleteTask)

module.exports = router;