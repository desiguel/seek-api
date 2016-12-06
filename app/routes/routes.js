// app/routes.js
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var secrets = require('../../config/secrets.js');

const saltRounds = 10;

module.exports = function (app, express, port, User, source) {

  // Test route.
  app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
  });

  // Route used for setting up initial user.
  // app.get('/setup', function(req, res) {

    // Create a user with hashed password.
    // bcrypt.hash('<insert pw here>', saltRounds, function(err, hash) {
      // Store hash in DB.
      // var andre = new User({
      //   name: 'andre',
      //   password: hash,
      //   admin: true
      // });
      //
      // // save the sample user
      // andre.save(function(err) {
      //
      //   if (err) throw err;
      //
      //   console.log('User saved successfully');
      //   res.json({ success: true });
      // });
    // });
  // });

  // API routes
  var api_routes = express.Router();

  // route to authenticate a user (POST http://localhost:8080/api/authenticate)
  api_routes.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
      name: req.body.name
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        // check if hashed password matches
        bcrypt.compare(req.body.password, user.password, function(err, compare_result) {

          if (compare_result != true) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {

            // if user is found and password is right
            // create a token
            var token = jwt.sign(user, secrets.secret, {
              expiresIn: 1440 // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Login success. Token provided.',
              token: token
            });
          }
        });
      }
    });
  });

  // Route middleware to verify a token.
  api_routes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });

    }
  });

  // Test API default route. (GET http://localhost:8080/api/)
  api_routes.get('/', function(req, res) {
    res.json({ message: 'Default API route test success' });
  });

  // Route to return all users (GET http://localhost:8080/api/users)
  api_routes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });

  app.use('/api', api_routes);

};
