var express = require('express');
var router = express.Router()
require('dotenv').config()
const OptionController = require('../Controllers/OptionController')

router.post('/add',OptionController.addOption);
router.get('/',OptionController.GetOption);


module.exports = router;