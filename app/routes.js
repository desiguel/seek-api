// app/routes.js

module.exports = function (app, port) {

  // basic route
  app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
  });

  // API routes

};
