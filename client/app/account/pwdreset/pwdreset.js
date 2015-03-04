'use strict';

angular.module('ludiicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pwdreset', {
        url: '/pwdreset?code',
        templateUrl: 'app/account/pwdreset/pwdreset.html',
      });
  });