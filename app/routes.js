// app/routes.js

var source       = require('./models/sourcedata');

module.exports = function(app, passport) {

    // =====================================
    // LOGIN ===============================
    // =====================================
    // Show the login form.
    app.get('/', function(req, res) {

        // render the login page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // Process the login form.
    app.post('/', passport.authenticate('local-login', {
        successRedirect : '/view', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // MAIN SITE =====================
    // =====================================
    // Protected by the isLoggedIn function.
    app.get("/view", isLoggedIn, function (req, res) {

        var startDate = source.getMonday(new Date());
        startDate = startDate.toISOString().slice(0, 10);

        console.log("Getting data..");

        source.getData(startDate, function (liveData) {
            res.render('index.ejs',
                {
                    resourceday: JSON.stringify(liveData[1]), dayresource: JSON.stringify(liveData[0]),
                    startdate: '"' + startDate + '"'
                });
        });

    });

    // Route for requesting data from the source site.
    app.post('/view', isLoggedIn, function (req, res) {
        var startDate = req.body.startDate;

        console.log("BOOM! Ajax request for week starting: " + startDate);
        // startDate = new Date(startDate);
        // startDate = startDate.toISOString().slice(0,10);

        source.getData(startDate, function (liveData) {
            res.send({
                resourceday: JSON.stringify(liveData[1]), dayresource: JSON.stringify(liveData[0]),
                startdate: '"' + startDate + '"'
            });
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}