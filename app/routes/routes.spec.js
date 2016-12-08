// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");

// Require the dev-dependencies.
var secrets = require('../../config/secrets.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server.js');
var should = chai.should();

chai.use(chaiHttp);

// Test the default test route.
describe('Test route /GET', function () {
  it('should GET welcome message.', function (done) {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        done();
      });
  });
});

// Authentication function.
var authenticate = function(callback) {
  chai.request(server)
    .post('/api/authenticate')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({
      name: secrets.authname,
      password: secrets.authpassword
    })
    .end(function(err, res) {callback(err, res)});
};

// Test API authentication.
var test_token = "";
describe('API authentication /POST user credentials', function () {
  it('should provide token.', function (done) {
    authenticate(function(err, res){
      res.should.have.status(200);
      res.body.success.should.be.eql(true);
      res.body.token.should.be.not.eql("");
      test_token = res.body.token;
      done();
    });
  });
});

// Test the API routes.
describe('API route', function () {

  describe('/GET', function () {
    it('/api without auth token should return fail.', function (done) {
      chai.request(server)
        .get('/api')
        .end(function (err, res) {
          res.should.have.status(403);
          res.body.success.should.be.eql(false);
          done();
        });
    });
  });

  describe('/GET', function () {
    it('/api with auth token should return success.', function (done) {
      chai.request(server)
        .get('/api')
        .query({token: test_token})
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.success.should.be.eql(true);
          done();
        });
    });
  });

});