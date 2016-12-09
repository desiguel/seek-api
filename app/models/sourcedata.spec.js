var source = require("./sourcedata.js");

// Require the dev-dependencies.
var chai = require('chai');
var should = chai.should();

// Test if external getData function is working.
describe('Function getData', function() {

  var jobs_list;

  before(function (done) {
    source.getData(function(err, result) {
      jobs_list = result.data;
      done();
    });
  });

  it('should return a jobs list of non-zero length.', function(done) {
    should.not.equal(jobs_list, undefined);
    jobs_list.length.should.not.be.eql(0);
    done();
  });
});
