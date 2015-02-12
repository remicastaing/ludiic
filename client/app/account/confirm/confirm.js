'use strict';

angular.module('ludiicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('confirm', {
        url: '/confirm?token',
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl'
      });
  });