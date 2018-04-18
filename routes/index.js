const express = require('express');
const router = express.Router();
const api = require('./api');
const login = require('./login');
const {auth} = require('../utils');

const passport = auth.authenticate();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.use('/api', api);
router.use('/login', login);

module.exports = router;