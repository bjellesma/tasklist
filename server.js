var express = require('express'); //brings in express fron node_modules
var path = require('path');
var bodyParser = require('body-parser');
//for sessions
var cookieParser = require('cookie-parser')
var session = require('express-session');

var index = require('./routes/index');
//refer to api.js in the routes folder
var api = require('./routes/api');
var users = require('./routes/users');

var port = process.env.APIPORT;

var app = express(); //main variable
app.use(cookieParser());
//login middleware
app.use(session({
  secret: process.env.SESSIONSECRET,
  resave:false,
  saveUninitialized: true,
  cookie: { secure: !true }
}));
//require('dotenv').config();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //ejs is our templating system
app.engine('html', require('ejs').renderFile); //to be able to use html files with our engine

//static folder
app.use(express.static(path.join(__dirname, 'client'))); //our static folder will contain all of our angular files

// Body Parser Middleware
app.use(bodyParser.json()); //we want to be able to parse json
app.use(bodyParser.urlencoded({extended: false}));
// /login middleware
app.use('/', index); //we want the slash to be associated with our index route (named above)
app.use('/api', api); //to interact with the api
app.use('/users', users); //to interact with the api
//app.use('/api', tabs); //to interact with the api

app.listen(port, function(){
  console.log('Server started on port ' + port);
});
