'use strict';

angular.module('ludiicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profil', {
        url: '/profil',
        templateUrl: 'app/profil/profil.html',
      });
  });