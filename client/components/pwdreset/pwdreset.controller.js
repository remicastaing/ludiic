'use strict';

angular.module('ludiicApp')
  .controller('PwdResetCtrl', function ($scope, Auth, $state, $stateParams) {

    var ctrl = this;

    
    ctrl.pwdResetState = 'mailform';


    var _resetform = {};
    var _newPasswordForm = {};

    var pwdresetCode = $stateParams.code;
    if (pwdresetCode) {
      ctrl.pwdResetState = 'passwordform';
    }


    ctrl.sendPwdResetMail = function(resetform) {
      _resetform = resetform;
      if(_resetform.$valid) {
        _resetform.submitted = true;
        Auth.sendPwdResetMail( ctrl.email )
        .then( function() {
          ctrl.pwdResetState = 'mailsent';
        })
        .catch( function(err) {
          _resetform.email.$setValidity('unknownMailAddress', false);
          _resetform.submitted = false;
        });
      }
    };

    ctrl.changeResetedPassword = function(newPasswordForm) {
      _newPasswordForm = newPasswordForm;
      if(_newPasswordForm.$valid) {
        _newPasswordForm.submitted = true;
        Auth.changeResetedPassword( pwdresetCode, ctrl.newPassword )
        .then( function() {
          $state.go('main');
        })
        .catch( function(err) {
          _newPasswordForm.newPassword.$setValidity('invalidResetCode', false);
        });
      }
    };


    ctrl.resetStateIs = function(state) {
      return ctrl.pwdResetState===state;
    };


  });