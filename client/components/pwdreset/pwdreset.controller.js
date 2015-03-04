'use strict';

angular.module('ludiicApp')
  .controller('PwdResetCtrl', function ($scope, Auth, $state, $stateParams) {

    var ctrl = this;

    ctrl.errors = {};
    ctrl.isLoggedIn = Auth.isLoggedIn;
    var pwdresetCode = $stateParams.code;
    var pwdResetState = 'mailform';
    ctrl.pwdResetMailSend = false;
    ctrl.invalidResetCode = false;
    ctrl.unknownMailAddress = false;



    if (pwdresetCode) {
      pwdResetState = 'passwordform';
    }


    ctrl.sendPwdResetMail = function(form) {

    
      ctrl.submitted = true;
      ctrl.unknownMailAddress = false;
      if(form.$valid) {
        ctrl.pwdResetMailSend = true;
        Auth.sendPwdResetMail( ctrl.email )
        .then( function() {
          pwdResetState = 'mailsent';
          ctrl.message = 'Password successfully changed.';
        })
        .catch( function(err) {
          ctrl.unknownMailAddress = true;
          ctrl.message = '';
          ctrl.pwdResetMailSend = false;
        });
      }
    };

    ctrl.changeResetedPassword = function(form) {
      console.log('sent');
      ctrl.submitted = true;
      if(form.$valid) {
        Auth.changeResetedPassword( pwdresetCode, ctrl.newPassword )
        .then( function() {
          ctrl.message = 'Password successfully changed.';
          $state.go('main');
        })
        .catch( function(err) {
          //form.password.$setValidity('mongoose', false);
          console.log(err);
          ctrl.invalidResetCode = true;
          ctrl.message = '';
        });
      }
    };


    ctrl.resetStateIs = function(state) {
      return pwdResetState===state;
    };


  });