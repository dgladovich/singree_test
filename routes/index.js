var express = require('express');
var router = express.Router();
const api = require('./api');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/api', api);

module.exports = router;
