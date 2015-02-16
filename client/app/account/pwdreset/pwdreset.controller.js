'use strict';

angular.module('ludiicApp')
  .controller('PwdresetCtrl', function ($scope, Auth, $state, $stateParams) {
    $scope.errors = {};
    $scope.pwdResetMailSend = false;
    $scope.unknownMailAddress = false;
    $scope.email = $scope.email || {to : ''};
    var passwordResetToken = $stateParams.token;
    $scope.invalidResetCode = false;


    $scope.sendPwdResetMail = function(form) {
      $scope.submitted = true;
      $scope.unknownMailAddress = false;
      if(form.$valid) {
        $scope.pwdResetMailSend = true;
        Auth.sendPwdResetMail( $scope.reset.email )
        .then( function() {
          $scope.email.to = $scope.reset.email;
          $state.go('pwdreset.mailsent');
        })
        .catch( function(err) {
          $scope.unknownMailAddress = true;
          $scope.message = '';
          $scope.pwdResetMailSend = false;
        });
      }
    };

    $scope.changeResetedPassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changeResetedPassword( passwordResetToken, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
          $state.go('main');
        })
        .catch( function(err) {
          //form.password.$setValidity('mongoose', false);
          $scope.invalidResetCode = true;
          $scope.message = '';
        });
      }
    };

  });
