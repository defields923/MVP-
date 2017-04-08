//adding opensource modules to application
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();
let PORT = process.env.PORT || 3000;

//connection database
mongoose.connect(process.env.MONGODB);

//import the routers
var router = require('./Routes/router');
var app = express();

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
  // var host = server.address().address;
  // var port = server.address().port;
  console.warn('app is listening... ');
});

//exporting this application as a module
module.exports = app;
