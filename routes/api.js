const express = require('express');
const router = express.Router();
const blog = require('./blog');
const comments = require('./comments');
const acl = require('./acl');

router.use('/blog', blog);
router.use('/comments', comments);

module.exports = router;
