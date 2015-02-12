'use strict';

angular.module('ludiicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pwdreset', {
        url: '/pwdreset',
        abstrct: true,
        templateUrl: 'app/account/pwdreset/pwdreset.main.html',
        controller: 'PwdresetCtrl'
      })
      .state('pwdreset.form', {
        url: '/form',
        templateUrl: 'app/account/pwdreset/pwdreset.form.html',
        controller: 'PwdresetCtrl'
      })
      .state('pwdreset.mailsent', {
        url: '/mailsent',
        //parent: 'pwdreset',
        templateUrl: 'app/account/pwdreset/pwdreset.mailsent.html',
        controller: 'PwdresetCtrl'
      })
      .state('pwdchange', {
        url: '/changepassword?token',
        templateUrl: 'app/account/pwdreset/pwdchange.html',
        controller: 'PwdresetCtrl'
      });;
  });