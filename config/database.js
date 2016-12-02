// config / database.js

// WARNING: Current configuration does not use usernames and passwords
// hashed to an external database. Instead uses locally stored plaintext
// users and passwords.

// This is not recommended for long term use.

// TODO use a proper NoSQL database.

// Require minimongo
var minimongo = require("minimongo");

var LocalDb = minimongo.MemoryDb;

// Create local db (in memory database with no backing)
db = new LocalDb();

// Add a collection to the database
db.addCollection("logins");

var doc = {

  local: {
    id: "1",
    username: "userid",
    password: "password"
  }

};

// Always use upsert for both inserts and modifies
db.logins.upsert(doc, function () {
  // Success:
  db.logins.findOne({"local.username": "staff"}, {}, function (res) {
    //console.log("User's password is: " + res.local.password);
  });
});

module.exports = db.logins;