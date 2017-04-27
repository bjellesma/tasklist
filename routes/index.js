var express = require('express');
var app = express();
var router = express.Router();
var mongojs = require('mongojs');
require('dotenv').config();
//for sessions
var session = require('client-sessions');
//login middleware
app.use(session({
  cookieName: 'Session',
  //the secret is used to encrypt and decrypt cookies
  secret: process.env.SESSIONSECRET,
  //how long the cookie will live in milliseconds
  duration: process.env.SESSIONDURATION,
  //how long the user is able to extend the session if another request is made
  activeDuration: process.env.SESSIONEXTENSION,
}));


var db = mongojs('mongodb://' + process.env.DBUSERNAME + ':' + process.env.DBPASSWORD + '@' + process.env.DBHOST + ':' + process.env.DBPORT + '/' + process.env.DBNAME, ['users']);

function requireLogin (req, res, next) {
  if (!session.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

router.get('/', requireLogin, function(req, res, next){
  res.render('index.html'); //res.send with send anything to the browser while res.render will show a file
});
router.get('/register', function(req, res, next){
  res.render('register.html'); //res.send with send anything to the browser while res.render will show a file
});
router.post('/register', function(req, res) {
  db.users.findOne({ name: req.body.username}, function(err, user) {
    if (user) {
      res.send('Sorry, That username already exists. Please choose another.');
    }else {
      if (req.body.username && req.body.password && req.body.verify){
        if (req.body.password === req.body.verify) {
          //hash password
          var passwordHash = require('crypto').createHash('sha256').update(req.body.password).digest('hex');
          var user = {
            "name": req.body.username,
            "passwordHash": passwordHash
          }
          //var user = JSON.stringify(userString);
          //add user
          db.users.save(user, function(err, user){
            if(err){
              res.send(err);
            }
            //set session
            session.user = user;
            //redirect user
            res.redirect("/");
          });

        } else {
          res.send('password incorrect');
        }
      } else {
        res.send("Sorry, you must fill out every field")
      }
    }
  });
});
router.get('/login', function(req, res, next){
  res.render('login.html');
});
router.post('/login', function(req, res) {
  db.users.findOne({ name: req.body.username}, function(err, user) {
    if (!user) {
      res.send('No user found');
    }else {
      var passwordHash = require('crypto').createHash('sha256').update(req.body.password).digest('hex');
      if (passwordHash === user.passwordHash) {


        //set session
        session.user = user;
        //redirect user
        res.redirect("/");
      } else {
        res.send('password incorrect');
      }
    }
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
  session = '';
  res.redirect('/');
});
router.get('/new-list', requireLogin, function(req, res, next){
  res.render('new-list.html'); //res.send with send anything to the browser while res.render will show a file
});
router.get('/profile', requireLogin, function(req, res, next){
  res.render('profile.html'); //res.send with send anything to the browser while res.render will show a file
});
router.get('/env', requireLogin, function(req, res, next){
  res.json({apiip: process.env.APIIP, apiport: process.env.APIPORT, user: session.user});
});

module.exports = router; //so that we can access the router from different files
