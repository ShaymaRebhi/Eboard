var express = require('express');
var router = express.Router()
require('dotenv').config()
const TaskController = require('../Controllers/TaskController')

router.post('/add',TaskController.addTask);
router.get('/',TaskController.GetTask);
router.get('/:id',TaskController.GetOneTask);
router.delete('/:id',TaskController.deleteTask);
router.post('/update/:id',TaskController.updateTask);
router.get('/getTaskByTeacher/:idUserr/:idClasse',TaskController.getTaskByTeacher);
router.post('/assign/:idClass',TaskController.assignTask);
router.post('/assignTaskAfterSave/:idClass',TaskController.assignTaskAfterSave);
router.get('/getTaskByStudentAssigned/:idClass/:idUserr',TaskController.getTaskByStudentAssigned);
router.get('/getTaskByStudentWorked/:idClass/:idUserr',TaskController.getTaskByStudentWorked);
router.get('/displayTask/:idUserr/:idTask',TaskController.DisplayTaskByStudent);
router.post('/updateEvaluationStatus/:id',TaskController.updateTaskEvaluationStatus);
module.exports = router;