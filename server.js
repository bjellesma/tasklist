
var express = require('express'); //brings in express fron node_modules
var path = require('path');
var bodyParser = require('body-parser');
//for sessions
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var session = require('express-session');

var index = require('./routes/index');
//refer to api.js in the routes folder
var api = require('./routes/api');

var port = process.env.APIPORT;


var ip = process.env.APIIP;
var mode = process.env.MODE;
var app = express(); //main variable


//favicon
//github/expressjs/serve-favicon
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'client/icon', 'favicon.ico')));
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
app.use(cookieParser());
// Validator middleware
app.use(expressValidator());
//login middleware
//TODO need session store for express-session
app.use(session({
  secret: process.env.SESSIONSECRET,
  resave:false,
  saveUninitialized: true,
  cookie: {
            secure: !true,
          }
}));
//create a cors middleware
app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', index); //we want the slash to be associated with our index route (named above)
app.use('/api', api); //to interact with the api


app.listen(port, function(){
  console.log('Server started at ' + ip + ' on port ' + port + ' using mode ' + mode);
});
