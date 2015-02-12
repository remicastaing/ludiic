'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var mailer = require('../../mailer');
var auth = require('../../auth/auth.service')

var validationError = function(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  };
};

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).send();
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.findAsync({}, '-salt -hashedPassword')
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(handleError(res));
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  var newUser = new User(req.body);
  newUser.saveAsync()
    .spread(function(user) {
      req.user = user;
      next();
    })
    .catch(validationError(res));
};

exports.sendToken = function(req, res, next) {
  var token = jwt.sign({ _id: req.user._id, name: req.user.name, role: req.user.role }, config.secrets.session, {expiresInMinutes: 60 * 5});
  res.json({ token: token });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(function(user) {
      if (!user) {
        return res.send(404);
      }
      res.json(user.profile);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(respondWith(res, 204))
    .catch(handleError(res));
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(function(user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(respondWith(res, 200))
          .catch(validationError(res));
      } else {
        return res.send(403);
      }
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -hashedPassword')
    .then(function(user) { // don't ever give out the password or salt
      if (!user) { return res.json(401); }
      res.json(user);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

exports.sendEmailVerification = function(req, res, next) {
  var user = req.user;

  //if (!req.body || !req.body.email) { return res.status(400).send('no email supplied'); }
  var payload = {
    user : {
      _id: user._id,
      name: user.userName,
      email: user.email
    }
  };

  var token = jwt.sign(payload, config.secrets.verify);
  var verifyCallback = config.userAccounts.verifyEmailCallbackURL + '?token=' + token;
  var userName = req.body.name || 'mailSupport user';

  mailer.sendMail({
    to: user.email,
    subject: 'Verify your email address',
    name: userName,
    signature : 'Rémi',
    footer: false,
    link: verifyCallback
  }, {
    template: 'verify-email-address'
  }, function(err) {
    if (err) { next(err);}
    next();
  });
};


exports.confirmEmail = function(req, res, next) {
  var userId = req.body.user._id;


  User.findByIdAsync(userId)
    .then(function(user) {
        user.verified = true;
        return user.saveAsync()
          .then(function(){
            req.user = user;
            next();
          })
          .catch(validationError(res));

      
        
    })
    .catch(function(err) {
      return next(err);
    });

}


exports.sendPasswordReset = function(req, res, next) {
  if (!req.body || !req.body.email) { return res.status(400).send('no email supplied'); }

  User.findOneAsync({
    email: req.body.email.toLowerCase()
  })
    .then(function(user) {
      if (!user) {
        return res.send(404);
      }

      var token = jwt.sign({ _id: user._id }, config.secrets.account, {
        expiresInMinutes: 60
      });
      var resetCallback = config.userAccounts.passwordResetCallbackURL + '?token=' + token;
      var userName = req.body.name || 'mailSupport user';

      mailer.sendMail({
        to: req.body.email,
        subject: 'Reset your password',
        name: userName,
        signature: 'Rémi',
        footer: false,
        link: resetCallback
      }, {
        template: 'reset-password'
      }, function(err) {
        if (err) { return res.status(500).send(); }
        return next();
      });
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Reset and change password
 */
exports.changeResetedPassword= function(req, res, next) {

  var userId = req.body._id;
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(function(user) {
      user.password = newPass;
        return user.saveAsync()
          .then(function(){
            var token = auth.signToken(user._id, user.role);
            res.status(200).json({ token: token })
          })
          .catch(validationError(res));
    })
    .catch( handleError(res, 403) );

};
