/**
 * Created by hudinghua 2017/02/28.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  	res.render('login');
});

module.exports = router;