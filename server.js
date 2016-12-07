// server.js

// set up ======================================================================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('config'); // file is automagic. See: https://github.com/lorenwest/node-config/wiki/Configuration-Files
var User = require('./app/models/user'); // get our mongoose model
var source = require('./app/models/sourcedata');

// configuration ===============================================================

var port = process.env.PORT || 8080;
mongoose.connect(config.database); // connect to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.set('super_secret', config.secret); // secret variable

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// logging =====================================================================

// Don't log when under test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined'));
}

app.use(morgan('dev')); // log every request to the console

// routes ======================================================================

// load routes
require('./app/routes/routes.js')(app, express, port, User, source);

// launch ======================================================================

var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});