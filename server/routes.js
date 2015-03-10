/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var cors = require('cors');

var corsOptions = {
  origin: "http://www.ludiic.fr",
  credentials: true,

};

module.exports = function(app) {

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));

  // Insert routes below
  app.use('/api/test', require('./api/test'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));



  // All other routes should redirect to the index.html
  
  if (process.env.NODE_ENV==='production') {
    app.route('/*')
    .get(function(req, res) {
       res.redirect("http://www.ludiic.fr");
    });
    app.route('/')
    .get(function(req, res) {
       res.redirect("http://www.ludiic.fr");
    });
  } else {
    app.route('/*')
    .get(function(req, res) {
        // All undefined asset or api routes should return a 404
      app.route('/:url(api|auth|components|app|bower_components|assets)/*')
       .get(errors[404]);
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
  };

  
};
