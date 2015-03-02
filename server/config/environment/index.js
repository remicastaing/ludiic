'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  clientDomain : process.env.CLIENT_DOMAIN,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'ludiic-secret',
    verify: 'mail-support-verify-secret',
    account: 'mail-support-account-secret'
  },

  // User account options
  userAccounts: {
    verifyNewEmail: true,
    verifyEmailCallbackURL: (process.env.CLIENT_DOMAIN || '') + '/confirm',
    passwordReset: true,
    passwordResetCallbackURL: (process.env.CLIENT_DOMAIN || '') + '/changepassword'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  mail: {
    // default from address
    fromAddress: process.env.FROM_ADDRESS ||'mailSupport <mailSupportApp@example.com>',

    // default mail transport
    transport: 'smtp-transport',

    // transport configurations
    transports: {
      /**
       * @see https://github.com/andris9/nodemailer-smtp-transport#usage
       */
      'smtp-transport': {
        service: 'mailgun',
        auth: {
          user: process.env.SMTP_TRANSPORT_USER || 'username2',
          pass: process.env.SMTP_TRANSPORT_PASS || 'password'
        }
      }
    }
  }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
