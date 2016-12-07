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

// TODO Test API authentication.
describe('API authentication /POST user credentials', function () {
  it('should provide token.', function (done) {
    chai.request(server)
      .post('/api/authenticate')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        name: secrets.username,
        password: secrets.password
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.token.should.be.not.eql("");
        done();
      });
  });
});

// Test the API routes.
// describe('API route', function () {
//
//   // Things to do before each test.
//   beforeEach(function (done) {
//     // TODO Authenticate
//     done();
//   });
//
//   // Test the default test route.
//   describe('/GET', function () {
//     it('should GET welcome message.', function (done) {
//       chai.request(server)
//         .get('/')
//         .end(function (err, res) {
//           res.should.have.status(200);
//           res.body.success.should.be.eql(true);
//           done();
//         });
//     });
//   });
//
// });