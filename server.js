// server.js

// set up ======================================================================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('config'); // file is automagic. See: https://github.com/lorenwest/node-config/wiki/Configuration-Files
var User = require('./app/models/user'); // get our mongoose model

// configuration ===============================================================

var port = process.env.PORT || 8080;
mongoose.connect(config.database); // connect to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));

app.set('super_secret', config.secret); // secret variable

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// logging =====================================================================

// Don't log when under test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('dev'));
}

// routes ======================================================================

// load routes
require('./app/routes/routes.js')(app, express, port, User);

// launch ======================================================================

var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app; // for testing