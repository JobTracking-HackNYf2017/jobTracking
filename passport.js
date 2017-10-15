var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('./app/models/user');
var config = require('./credentials.json');
var gmailAPI = require('node-gmail-api');


var emails = function(tok) {

  return messages;
}

module.exports = function(passport) {

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// code for login (use('local-login', new LocalStategy))
// code for signup (use('local-signup', new LocalStategy))
// code for facebook (use('facebook', new FacebookStrategy))
// code for twitter (use('twitter', new TwitterStrategy))

// =========================================================================
// GOOGLE ==================================================================
// =========================================================================
passport.use(new GoogleStrategy({

      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callback,
      },
      function(token, refreshToken, profile, done) {

      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Google
      process.nextTick(function() {
        var email = new gmailAPI(token);
        messages = email.messages('label:inbox', {max: 10});

        messages.on('data', function (d) {
            console.log(d.snippet)
          })
        // check if the user is already logged in
        console.log(profile);
          User.findOne({
            'id': profile.id
          }, function(err, user) {
            if (err)
              return done(err);

            if (user) {

              // if there is a user id already but no token (user was linked at one point and then removed)
              if (!user.token) {
                user.token = token;
                user.name = profile.displayName;
                user.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                user.save(function(err) {
                  if (err)
                    return done(err);

                  return done(null, user);
                });
              }

              return done(null, user);
            } else {
              var newUser = new User();

              newUser._id = profile.id;
              newUser.token = token;
              newUser.name = profile.displayName;
              newUser.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

              newUser.save(function(err) {
                if (err)
                  return done(err);

                return done(null, newUser);
              });
            }
          });

      });

}));

};
