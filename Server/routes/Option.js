var express = require('express');
var router = express.Router()
require('dotenv').config()
const OptionController = require('../Controllers/OptionController')

router.post('/add',OptionController.addOption);
router.get('/',OptionController.GetOption);
router.get('/:id',OptionController.GetOneOption);
router.delete('/:id',OptionController.deleteOption);
router.put('/update',OptionController.updateOption);

module.exports = router;