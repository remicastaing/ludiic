'use strict';

angular.module('ludiicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pwdresetwithcode', {
        url: '/pwdreset?code',
        templateUrl: 'app/account/pwdreset/pwdreset.html',
      })
      .state('pwdreset', {
        url: '/pwdreset',
        templateUrl: 'app/account/pwdreset/pwdreset.html',
      });
  });