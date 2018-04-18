const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const validations = require('./validation/comment');
const commentCtrl = require('../controllers/CommentController');
const {auth} = require('../utils');

router
    .get('/count', validate(validations.countComments), commentCtrl.countComments)
    .get('/', validate(validations.getAllComments), commentCtrl.getAllComments)
    .get('/:id', validate(validations.getCommentById), commentCtrl.getCommentById)
    .post('/', auth.isAuthenticated, validate(validations.createComment), commentCtrl.createComment)
    .put('/:id', auth.isAuthenticated, validate(validations.updateCommentById), commentCtrl.updateCommentById)
    .delete('/:id', auth.isAuthenticated, validate(validations.deleteCommentById), commentCtrl.deleteCommentById);


module.exports = router;
