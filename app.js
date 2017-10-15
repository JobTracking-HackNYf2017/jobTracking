var express = require('express');
var gmail = require('node-gmail-api');
var passport = require('passport');
var mongoose = require('mongoose');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser= require('body-parser');
var session=require('express-session');

var app = express();
//db Connection MongoDB
/***************************
 *        config           *
 ***************************/
 var dburl="mongodb://root:traec12@ds121225.mlab.com:21225/jobtracking";
 mongoose.connect(dburl, {
   useMongoClient: true
 });
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'trackingyourjob2017', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.get('/google50bd14559a8ebfe0.html', function(req,res){
  res.sendfile(__dirname + '/views/google50bd14559a8ebfe0.html');
});
/***************************
 *       Routing           *
 ***************************/
// route for home page
// routes for testing ( they will change once front is done)
app.get('/', function(req, res) {
  res.render('index.ejs'); // render home
});


require('./passport')(passport);
// route for showing the profile page
app.get('/dashboard', isLoggedIn, function(req, res) {
  res.render('profile.ejs', {
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



  /***************************
   *       middleware           *
   ***************************/
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

/***************************
 *       Port listener     *
 ***************************/
var port = process.env.PORT || 8080;
app.listen(port);
