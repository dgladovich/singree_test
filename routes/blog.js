const express = require('express');
const router = express.Router();
const validate = require('express-validation');
const validations = require('./validation/blog');
const blogCtrl = require('../controllers/BlogController');
const { auth }  = require('../utils');

router
    .get('/count', validate(validations.countBlogs), blogCtrl.countBlogs)
    .get('/', validate(validations.getAllBlogs), blogCtrl.getAllBlogs)
    .get('/:id', validate(validations.getBlogById), blogCtrl.getBlogById)
    .post('/', auth.isAuthenticated, validate(validations.createBlog), blogCtrl.createBlog)
    .put('/:id', auth.isAuthenticated, validate(validations.updateBlogById), blogCtrl.updateBlogById)
    .delete('/:id', auth.isAuthenticated, validate(validations.deleteBlogById), blogCtrl.deleteBlogById);


module.exports = router;
