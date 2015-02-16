'use strict';

var _ = require('lodash');
var Test = require('./test.model');
var mailer = require('./../../mailer');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.send(statusCode, err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          return res.status(204).end();
        });
    }
  };
}

// Gets list of tests from the DB.
exports.index = function(req, res) {
  Test.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single test from the DB.
exports.show = function(req, res) {
  Test.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new test in the DB.
exports.create = function(req, res) {
  Test.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing test in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Test.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a test from the DB.
exports.destroy = function(req, res) {
  Test.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};


exports.mail = function(req, res){
  console.log('send test mail');
  mailer.sendMail(
    {
      to: 'remi.castaing+test@gmail.com',   // required
      from: 'postmaster@ludic.io',      // optional (defaults to global config value)
      subject: 'Your new message',     // optional
      //message: 'This is your message'  // all properties get passed to templating as locals
    },
    {
      template : 'basic'
    },
    function(err, response, mailing) {
      if (!err) {
          console.log('sent: ' + JSON.stringify(mailing));
          console.log('response: ' + JSON.stringify(response));
        }
      else{
        console.log(err);
      };
    });
  res.status(200).send('Test');
};
