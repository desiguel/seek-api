var cheerio     = require('cheerio');

// TODO insert details here.
var userid      = "";
var pw          = "";

/**
 * Return next value in array. Returns '' if no next value
 * @param array
 * @param value
 * @returns {*}
 */
function getNext(array, value) {
  index = array.indexOf(value);
  if(index >= 0 && index < array.length - 1)
     return array[index + 1];
  return '';
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

/**
 * Retrieves data from the source website. Essentially works as a quasi API.
 * @param startDate
 * @param callback
 */
function getData(startDate, callback) {
  
  var request = require('request');
  var j = request.jar();
  var fs = require('fs');

  // Make the HTTPS request.
  request({
      url:"https://site", // TODO insert site reference
      method:"POST",
      jar: j,
      form:{
        redirect: "",
        email:userid,
        password:pw,
        remember_me: "on"
      },
      headers: {               
      'Authorization': 'Basic ' + new Buffer(userid + ":" + pw).toString('base64')
  }
  },
  function(error, response, body){
    if (error){
      console.error(error);
      return;
    }
    request({
        url:"https://site", // TODO insert site reference
        method:"POST",
        jar: j,
        form: {}
    }, function(error, response, body){
        if (error){
          console.error(error);
          return;
        }
        var $ = cheerio.load(body);

        // TODO extract data from site page(s).
        
        // var mock_data = require('./../../mock_data.json');
        callback(data_variable); // TODO
    });
  });
}

exports.getData = getData;