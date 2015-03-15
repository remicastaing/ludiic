'use strict';

angular.module('ludiicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('welcome', {
        url: '/bienvenue',
        templateUrl: 'app/account/welcome/welcome.html',
        controller: 'WelcomeCtrl'
      });
  });