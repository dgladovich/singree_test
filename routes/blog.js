const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const validations = require('./validation/blog');
const blogCtrl = require('../controllers/BlogController');

router
    .get('/count', validate(validations.countBlogs), blogCtrl.countBlogs)
    .get('/', validate(validations.getAllBlogs), blogCtrl.getAllBlogs)
    .get('/:id', validate(validations.getBlogById), blogCtrl.getBlogById)
    .post('/', validate(validations.createBlog), blogCtrl.createBlog)
    .put('/:id', validate(validations.updateBlogById), blogCtrl.updateBlogById)
    .delete('/:id', validate(validations.deleteBlogById), blogCtrl.deleteBlogById);


module.exports = router;
