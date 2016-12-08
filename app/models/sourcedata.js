var cheerio = require('cheerio');

function processPage(body) {
  console.log(body);
}

/**
 * Retrieves data from the source website.
 * @param callback
 */
function getData(callback) {
  
  var request = require('request');

  // Construct url
  var protocol = "https";
  var host = "www.seek.com.au";
  var industry = "jobs-in-information-communication-technology";
  var location = "in-All-Brisbane-QLD";
  var keywords = "(javascript%20or%20data)%20not%20(%22.net%22%20or%20%22c%23%22%20or%20consultant)";
  var sortmode = "listeddate";
  var subclassification ="6287%2C6302";

  var url = protocol + "://" + host + "/" + industry + "/" + location + "?"
    + "keywords=" + keywords + "&sortmode=" + sortmode + "&subclassification=" + subclassification;

  // console.log(url);

  var url = "http://www.google.com";

  // Make the HTTPS request.
  request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      callback(null, {data: body});
    } else {
      callback(error);
    }
  });
}

exports.processPage = processPage;
exports.getData = getData;