'use strict';

angular.module('ludiicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('CGU', {
        url: '/CGU',
        templateUrl: 'app/CGU/CGU.html',
        controller: 'CGUCtrl'
      });
  });