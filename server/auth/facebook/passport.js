var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;



exports.setup = function(User, config) {

  var saveUser = function(user, done){
    user.saveAsync()
      .then(function(user) {
        return done(null, user[0]);
      })
      .catch(function(err) {
        return done(err);
      });
  }

  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOneAsync({
        'facebook.id': profile.id
      })
        .then(function(user) {
          if (user) {
            return done(null, user);
          } else {
            user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    role: 'user',
                    local: 'false',
                    verified : true,
                    username: profile.username,
                    facebook: profile._json,
                  });
            saveUser(user, done);
          }
        })
        .catch(function(err) {
          return done(err);
        });
    }));
};
