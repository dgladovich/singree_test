const express = require('express');
const router = express.Router();
const { passport } = require('../utils');
router
    .get('/logout', function (req, res, next) {
        req.logout();
        res.json({ message: 'You just loged out'})
    })
    .post('/', passport.authenticate('local'), function (req, res, next) {
        res.json({
            message: 'Successfully login'
        })
    });


module.exports = router;
