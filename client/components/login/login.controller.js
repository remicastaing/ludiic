'use strict';

angular.module('ludiicApp')
  .controller('LoginCtrl', function(Auth, $state, $stateParams, $window) {
    var _this = this;
    _this.user = {};
    var _form = {};


    if ($stateParams.sessionToken) {
      Auth.setSessionToken($stateParams.sessionToken, function(){$state.go('main');});
    }

    _this.login = function(form) {
      _form = form;
      if (form.$valid) {
        Auth.login({
          email: _this.user.email,
          password: _this.user.password
        })
        .then(function() {
          // Logged in, redirect to home
          $state.go('main');
        })
        .catch(function(err) {
          _form[err.errorOn].$setValidity(err.error, false); 
        });
      }
    };
  });
