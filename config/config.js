// config / database.js
var secrets = require('./secrets.js');

module.exports = {
  'secret': secrets.secret,
  'database': 'mongodb://' + secrets.username + ':'
    + secrets.password + '@ds159767.mlab.com:59767/seek-api'
};
