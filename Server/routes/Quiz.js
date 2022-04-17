var express = require('express');
var router = express.Router()
require('dotenv').config()
const QuizController = require('../Controllers/QuizController')

router.post('/add',QuizController.AddQuiz);
router.get('/',QuizController.GetQuiz);
router.get('/:id',QuizController.GetOneQuiz);
router.delete('/:id',QuizController.deleteQuiz);
router.post('/update/:id',QuizController.updateQuiz);
router.get('/getQuizByUserAndClass/:idUserr/:idClasse',QuizController.getQuizByUserAndClass);
router.post('/assign/:idClass',QuizController.assignQuiz);
router.post('/assignQuizAfterSave',QuizController.assignQuizAfterSave);
router.get('/getQuizByStudent/:idUserr',QuizController.getQuizByStudent);
module.exports = router;