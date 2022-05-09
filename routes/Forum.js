var express = require('express');
var router = express.Router();
const ForumController = require('../Controllers/ForumController');


router.get('/all',ForumController.getAll);
router.get('/get/:id',ForumController.findById);
router.delete('/delete/:id',ForumController.delete);
router.post('/new',ForumController.add);
router.put('/update',ForumController.update);
router.post('/search',ForumController.search);


module.exports = router;
