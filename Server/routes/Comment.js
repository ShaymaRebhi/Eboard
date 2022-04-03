var express = require('express');
var router = express.Router();
const CommentController = require('../controllers/CommentController');


router.get('/all',CommentController.getAll);
router.get('/get/:id',CommentController.findById);
router.get('/forum/:id',CommentController.findByForumId);
router.delete('/delete/:id',CommentController.delete);
router.post('/new',CommentController.add);
router.put('/update',CommentController.update);

module.exports = router;
