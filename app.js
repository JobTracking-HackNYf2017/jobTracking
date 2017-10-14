var express = require('express');
var gmail = require('node-gmail-api');

var app = express();


// route for home page
app.get('/', function(req, res) {
  res.render('home'); // load the index.ejs file
});

// route for login form
// route for processing the login form
// route for signup form
// route for processing the signup form

// route for showing the profile page
app.get('/dashboard', isLoggedIn, function(req, res) {
  res.render('dashboard.hbs', {
    user: req.user // get the user out of session and pass to template
  });
});

// route for logging out
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// the callback after google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
  }));


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
var port = process.env.PORT || 8080;
app.listen(port);
