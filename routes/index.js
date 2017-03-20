var express = require('express');
var router = express.Router();
require('dotenv').config();

router.get('/', function(req, res, next){
  res.render('index.html'); //res.send with send anything to the browser while res.render will show a file
});
router.get('/new-list', function(req, res, next){
  res.render('new-list.html'); //res.send with send anything to the browser while res.render will show a file
});

module.exports = router; //so that we can access the router from different files
