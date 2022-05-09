var express = require('express');
var router = express.Router();
const CommentController = require('../Controllers/CommentController');


router.get('/all',CommentController.getAll);
router.get('/get/:id',CommentController.findById);
router.get('/forum/:id',CommentController.findByForumId);
router.delete('/delete/:id',CommentController.delete);
router.post('/new',CommentController.add);
router.put('/update',CommentController.update);
router.post('/like',CommentController.like);
router.post('/dislike',CommentController.dislike);

module.exports = router;
