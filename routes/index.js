var express = require('express');
var app = express();
var mongojs = require('mongojs');
require('dotenv').config();
var router = express.Router();
var db = mongojs('mongodb://' + process.env.DBUSERNAME + ':' + process.env.DBPASSWORD + '@' + process.env.DBHOST + ':' + process.env.DBPORT + '/' + process.env.DBNAME, ['users']);

function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

router.get('/', requireLogin, function(req, res, next){
  res.render('index.html'); //res.send with send anything to the browser while res.render will show a file
});
router.get('/register', function(req, res, next){
  res.render('register.html', {success: false, errors: req.session.errors});
  req.session.errors = null;
  req.session.success = null;
});
router.post('/register', function(req, res) {
  //default is false
  var success = false, response = {}, errors = [];
  db.collection("users").findOne({ name: req.body.username}, function(err, user) {
    if (user) {
      success = false;
      errors.push("Sorry, That username already exists. Please choose another");
    }else {
      if (req.body.username && req.body.password && req.body.verifyPassword){
        if (req.body.password === req.body.verifyPassword) {
          //hash password
          var passwordHash = require('crypto').createHash('sha256').update(req.body.password).digest('hex');
          var newUser = {
            "name": req.body.username,
            "passwordHash": passwordHash
          }
          //var user = JSON.stringify(userString);
          //add user
          db.collection("users").save(newUser, function(err, user){
            if(err){
              success = false;
              errors.push(err);
            }
            success = true;
            req.session.user = user;
          });
        } else {
          success = false;
          errors.push('Sorry, Passwords do not match');
        }
      } else {
        success = false;
        errors.push("Sorry, you must fill out every field")
      }
    }
    response = {
      "success": success,
      "errors": errors
    }
    res.json(JSON.stringify(response));
  });
});
router.get('/login', function(req, res, next){
  res.render('login.html', {success: false, errors: req.session.errors});
  //reset errors
  req.session.errors = null;
  req.session.success = null;
});
router.post('/login', function(req, res, next) {

  //default is false
  var success = false, response = {}, errors = [];
  db.users.findOne({ name: req.body.username}, function(err, user) {
    if (!user) {
      success = false;
      errors.push("Username and/or Password is incorrect");
    }else {
      var passwordHash = require('crypto').createHash('sha256').update(req.body.password).digest('hex');
      if (passwordHash === user.passwordHash) {
        //set session
        success = true;
        req.session.user = user;
      } else {
        success = false;
        errors.push("Username and/or Password is incorrect");
      }
    }
    response = {
      "success": success,
      "errors": errors
    }
    res.json(JSON.stringify(response));
  });
});
router.get('/changePassword', function(req, res, next){
  res.render('changePassword.html');
});
router.post('/changePassword', function(req, res) {
  db.users.findOne({ name: req.body.username}, function(err, user) {
    if (!user) {
      res.send('No user found');
    }else {
      if (req.body.password === req.body.verify) {
        var passwordHash = require('crypto').createHash('sha256').update(req.body.password).digest('hex');
        user.passwordHash = passwordHash;
        db.users.save(user, function(err, user){
          if(err){
            res.send(err);
          }
        });
        res.redirect("/login");
      } else {
        res.send('passwords do not match');
      }
    }
  });
});
router.get('/logout', requireLogin, function(req, res) {
  req.session.destroy();
  res.redirect('/login');
});
//NOTE /profile will automatically redirect to /profile
router.get('/new-list', requireLogin, function(req, res, next){
  res.render('new-list.html'); //res.send with send anything to the browser while res.render will show a file
});
router.get('/user-profile', requireLogin, function(req, res, next){
  res.render('profile.html'); //res.send with send anything to the browser while res.render will show a file
});
router.get('/env', function(req, res, next){
  res.json({apiip: process.env.APIIP, apiport: process.env.APIPORT, user: req.session.user, mode: process.env.MODE});
});

module.exports = router; //so that we can access the router from different files
