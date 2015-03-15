'use strict';

angular.module('ludiicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mentions-legales', {
        url: '/mentions-legales',
        templateUrl: 'app/mentions-legales/mentions-legales.html',
        controller: 'MentionsLegalesCtrl'
      });
  });