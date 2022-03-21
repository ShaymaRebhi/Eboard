var express = require('express');
var router = express.Router()
require('dotenv').config()
const QuizController = require('../Controllers/QuizController')

router.post('/add',QuizController.AddQuiz);

module.exports = router;