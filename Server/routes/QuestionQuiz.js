var express = require('express');
var router = express.Router()
require('dotenv').config()
const QuestionController = require('../Controllers/QuestionQuizController')

router.post('/add',QuestionController.AddQuestion);
router.get('/',QuestionController.GetQuestion)


module.exports = router;