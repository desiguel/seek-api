var cheerio = require('cheerio');

/**
 * Extract the text from a string following a target string and ending with a ";".
 * @param target
 * @param variable
 * @returns {string}
 */
function findTextAndReturnRemainder(target, variable){
  var chopFront = target.substring(target.search(variable)+variable.length,target.length);
  return chopFront.substring(0,chopFront.search(";"));
}

/**
 * Take a body page and extract the jobs information from it.
 * @param body
 * @param callback
 */
function processPage(body, callback) {
  var $ = cheerio.load(body);
  var script_data = $($('script[data-automation=server-state]')[0]).text();
  var findAndClean = findTextAndReturnRemainder(script_data,"window.SEEK_REDUX_DATA =");
  callback(null, {data: JSON.parse(findAndClean).results.results.jobs});
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

  var options = {
    url: protocol + "://" + host + "/" + industry + "/" + location + "?"
         + "keywords=" + keywords + "&sortmode=" + sortmode + "&subclassification=" + subclassification,
    method: 'GET',
    headers: {
      Host: 'www.seek.com.au',
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:49.0) Gecko/20100101 Firefox/49.0'
    }
  };

  // Make the HTTPS request.
  request(options, function(error, response, body){
    if (!error && response.statusCode == 200) {
      processPage(body, callback);
    } else {
      callback(error);
    }
  });
}

exports.getData = getData;