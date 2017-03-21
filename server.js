var express = require('express'); //brings in express fron node_modules
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 3000;

var app = express(); //main variable
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

app.use('/', index); //we want the slash to be associated with our index route (named above)
app.use('/api', tasks); //to interact with the api

app.listen(port, function(){
  console.log('Server started on port ' + port);
});
