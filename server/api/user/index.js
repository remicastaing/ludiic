'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');
var config = require('../../config/environment');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.post('/resetpassword', controller.sendPasswordReset);
router.post('/changeResetedPassword', auth.verifyRequestToken(config.secrets.account), controller.changeResetedPassword);
router.post('/confirmEmail', auth.verifyRequestToken(config.secrets.verify), controller.confirmEmail, controller.sendToken);
router.post('/sendEmailVerification', controller.sendEmailVerification);
router.post('/', controller.create, controller.sendEmailVerification, controller.sendToken);

module.exports = router;
