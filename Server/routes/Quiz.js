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
router.post('/assignQuizAfterSave/:idClass',QuizController.assignQuizAfterSave);
router.get('/getQuizByStudentAssigned/:idClass/:idUserr',QuizController.getQuizByStudentAssigned);
router.get('/getQuizByStudentWorked/:idClass/:idUserr',QuizController.getQuizByStudentWorked);
router.get('/displayQuiz/:idUserr/:idQuiz',QuizController.DisplayQuizByStudent);
router.post('/updateEvaluation/:id',QuizController.updateEvaluationScoreAndStatus);
router.post('/updateStatus/:id',QuizController.UpdateQuizStatus);
router.get('/quizEvaluation/:id',QuizController.GetOneQuizEvaluation);
router.get('/GetNumberStudentByQuizEvaluation/:id',QuizController.GetNumberStudentByQuizEvaluation);
router.get('/GetNumberStudentWorkedQuiz/:id',QuizController.GetNumberStudentWorkedQuiz);
router.get('/GetNumberStudentAssignedQuiz/:id',QuizController.GetNumberStudentAssignedQuiz);
router.get('/AverageScore/:id',QuizController.getAverageQuizScore);
router.get('/getStudentListByQuizWorked/:idClass/:idQuiz',QuizController.getStudentListByQuizWorked);
module.exports = router;