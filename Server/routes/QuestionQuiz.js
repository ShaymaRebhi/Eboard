var express = require('express');
var router = express.Router()
require('dotenv').config()
const QuestionQuizController = require('../Controllers/QuestionQuizController')

router.post('/add',QuestionQuizController.AddQuestion);
router.get('/',QuestionQuizController.GetQuestion);
router.get('/:id',QuestionQuizController.GetOneQuestion);
router.delete('/:id',QuestionQuizController.DeleteQuestion);
router.put('/update',QuestionQuizController.updateQuestion);
module.exports = router;