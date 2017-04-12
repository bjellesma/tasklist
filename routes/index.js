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
router.get('/login', function(req, res, next){
  res.render('login.html');
});
router.post('/login', function(req, res) {
  db.users.findOne({ name: req.body.username}, function(err, user) {
    if (!user) {
      res.send('No user found');
    }else {
      if (req.body.password === user.passwordHash) {
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
router.get('/logout', requireLogin, function(req, res) {
  session = '';
  res.redirect('/');
});
router.get('/new-list', requireLogin, function(req, res, next){
  res.render('new-list.html'); //res.send with send anything to the browser while res.render will show a file
});
router.get('/env', requireLogin, function(req, res, next){
  res.json({apiip: process.env.APIIP, apiport: process.env.APIPORT, user: session.user});
});

module.exports = router; //so that we can access the router from different files
