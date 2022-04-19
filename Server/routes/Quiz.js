var express = require('express');
var router = express.Router()
require('dotenv').config()
const QuizController = require('../Controllers/QuizController')

router.post('/add',QuizController.AddQuiz);
router.get('/',QuizController.GetQuiz);
router.get('/:id',QuizController.GetOneQuiz);
router.delete('/:id',QuizController.deleteQuiz);
router.post('/update/:id',QuizController.updateQuiz);
router.get('/getQuizByTeacher/:idUserr/:idClasse',QuizController.getQuizByTeacher);
router.post('/assign/:idClass',QuizController.assignQuiz);
router.get('/getDetailQuizStudent/:idUserr/:idQuiz',QuizController.getDetailQuizByStudent);
router.post('/assignQuizAfterSave/:idClass',QuizController.assignQuizAfterSave);
router.get('/getQuizByStudentAssigned/:idClass/:idUserr',QuizController.getQuizByStudentAssigned);
router.post('/updateStatus/:id',QuizController.UpdateQuizStatus);
module.exports = router;