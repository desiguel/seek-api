// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./config/config.js');
var User = require('./app/models/user'); // get our mongoose model
var source = require('./app/models/sourcedata');

// configuration ===============================================================

var port = process.env.PORT || 8080;
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev')); // log every request to the console

// routes ======================================================================
// load our routes and pass in our app
require('./app/routes/routes.js')(app, express, port, User, source);

// launch ======================================================================
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});