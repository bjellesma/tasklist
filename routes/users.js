/*
* This page creates a RESTful API
*/
//load extenal js
//$.getScript('../secure.js')
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://' + process.env.DBUSERNAME + ':' + process.env.DBPASSWORD + '@' + process.env.DBHOST + ':' + process.env.DBPORT + '/' + process.env.DBNAME, ['users']);
require('dotenv').config();

router.get('/', function(req, res, next){
  db.users.find(function(err, users){
    if(err){
      res.send(err);
    }
    res.json(users);
  });
});

/*
* function to get single user
* :id make id a parameter
* req is the way we get requests
*/
router.get('/:id', function(req, res, next){
  db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
    if(err){
      res.send(user);
    }
    res.json(user);
  });
});


module.exports = router; //so that we can access the router from different files
