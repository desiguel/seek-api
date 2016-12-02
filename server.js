// server.js

// set up ======================================================================
// get all the tools we need
var express      = require('express');
var app          = express();
var port         = process.env.PORT || 3000;
// var me           = require('mustache-express');
var bodyParser   = require('body-parser');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var flash        = require('connect-flash');
var passport     = require('passport');

var User         = require('./config/database.js');

// configuration ===============================================================

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
// app.engine('html', me());
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({ secret: 'testing' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
// load our routes and pass in our app and fully configured passport
require('./app/routes.js')(app, passport);

// launch ======================================================================
var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});