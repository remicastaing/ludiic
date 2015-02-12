'use strict';

angular.module('ludiicApp')
  .controller('LoginCtrl', function($scope, Auth, $state, $stateParams, $window) {
    $scope.user = {};
    $scope.errors = {};


    if ($stateParams.sessionToken) {
      Auth.setSessionToken($stateParams.sessionToken, function(){$state.go('main');});
    }

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          // Logged in, redirect to home
          $state.go('main');
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
