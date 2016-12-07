// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");

// Require the dev-dependencies.
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server.js');
var should = chai.should();

chai.use(chaiHttp);

// Routes parent block.
describe('Route', function () {

  // Things to do before each test.
  beforeEach(function (done) {
    //
    done();
  });

  // Test the default test route.
  describe('/GET', function () {
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

});