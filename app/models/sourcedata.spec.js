var source = require("./sourcedata.js");

// Require the dev-dependencies.
var chai = require('chai');
var should = chai.should();

describe('Function getData', function() {

  before(function (done) {
    source.getData(function(err, result) {
      source.processPage(result);
      done();
    });
  });

  it('should return body.', function(done) {
    done();
  });
});
