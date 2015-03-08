'use strict';

var mongoose = require('mongoose-bird')();
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findByIdAsync(req.user._id)
        .then(function(user) {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(function(err) {
          return next(err);
        });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
          config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.status(403).end();
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, role) {
  var payload = { _id: id, role : role };
  return jwt.sign(payload, config.secrets.session, {
    expiresInMinutes: 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setToken(req, res) {
  if (!req.user) {
    return res.status(404).json({
      message: 'Something went wrong, please try again.'
    });
  }
  //console.log(req.user[0]);
  var token = signToken(req.user._id, req.user.role);
  res.redirect(config.clientDomain + '/login/'+token);
}

function verifyRequestToken(secret, enabled) {
  enabled = (arguments.length >= 2) ? enabled : true;
  return function(req, res, next) {
    if (!enabled) { return next(); }
    
    if (!req.query.token && (!req.body || !req.body.token)) { return res.status(401).send('no token supplied'); }
    var token = req.query.token || req.body.token;
    jwt.verify(token, secret, function(err, obj) {
      if (err) { return res.status(400).send('there was an error with the supplied token'); }
      if (req.body) {
        delete req.body.token;
        console.log(obj);
        for (var k in obj) {
          if (k !== 'iat') req.body[k] = obj[k];
        }
      } else {
        req.body = obj;
      }
      next();
    });
  };
};

exports.verifyRequestToken = verifyRequestToken;
exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setToken = setToken;
