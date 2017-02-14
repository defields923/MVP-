//adding opensource modules to application
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var mongoose = require('mongoose');
var models_user = require('./Angular/Models/user.js');
let PORT = process.env.PORT || 3000;

//connection database
mongoose.connect('mongodb://devin:439devin@ds151059.mlab.com:51059/test-database');

//import the routers
var router = require('./Routes/router');
//for using express throughout this application
var app = express();

//tell node that My application will use ejs engine for rendering, view engine setup
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

//tell node the global configuration about parser,logger and passport
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//tell node about these directories that application may get resources from
app.use('/', router);

app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'Content')));
app.use(express.static(path.join(__dirname, 'Angular')));
app.use(express.static(path.join(__dirname, 'Views/Main')));


//running server on node
var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

//exporting this application as a module
module.exports = app;
